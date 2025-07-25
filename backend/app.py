from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, pipeline

app = Flask(__name__)
CORS(app)

# Load model and tokenizer once at startup
MODEL_NAME = "gpt2"  # or "distilgpt2" for smaller model
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)
model.eval()
if torch.cuda.is_available():
    model.to("cuda")

def predict_next_words(text, num_suggestions=5, max_length=30):
    input_ids = tokenizer.encode(text, return_tensors="pt")
    if torch.cuda.is_available():
        input_ids = input_ids.to("cuda")
    with torch.no_grad():
        outputs = model.generate(
            input_ids,
            max_length=input_ids.shape[1] + 5,
            num_return_sequences=num_suggestions,
            do_sample=True,
            top_k=40,
            top_p=0.95,
            temperature=0.8,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id,
        )
    suggestions = set()
    for output in outputs:
        decoded = tokenizer.decode(output[input_ids.shape[1]:], skip_special_tokens=True)
        # Get only the first word(s) after the input
        next_word = decoded.strip().split(" ")[0]
        if next_word:
            suggestions.add(next_word)
        if len(suggestions) >= num_suggestions:
            break
    return list(suggestions)[:num_suggestions]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"suggestions": []})
    suggestions = predict_next_words(text)
    return jsonify({"suggestions": suggestions})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
