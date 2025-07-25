import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Background from "./Background";

function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const [dark, setDark] = useState(() => {
    // Persist theme in localStorage
    return localStorage.getItem("theme") === "dark";
  });
  const inputRef = useRef();
  let debounceTimeout = useRef();

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const fetchSuggestions = async (text) => {
    if (!text.trim()) {
      setSuggestions([]);
      setSelected(-1);
      return;
    }
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSuggestions(data.suggestions || []);
    setSelected(-1);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(e.target.value);
    }, 250);
  };

  const insertSuggestion = (idx) => {
    const words = input.trim().split(" ");
    words[words.length - 1] = suggestions[idx];
    setInput(words.join(" ") + " ");
    setSuggestions([]);
    setSelected(-1);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "Tab" || e.key === "ArrowRight") {
      e.preventDefault();
      insertSuggestion(selected === -1 ? 0 : selected);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((selected + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((selected - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && selected !== -1) {
      e.preventDefault();
      insertSuggestion(selected);
    }
  };

  return (
    <div className={dark ? "dark main-bg" : "main-bg"}>
      <Background dark={dark} />
      <div className="center-container">
        <div className={`container${dark ? " dark" : ""}`}>
          <div className="toggle-row">
            <h1>Word Prediction</h1>
            <button
              className={`toggle${dark ? " active" : ""}`}
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-thumb" />
              <span className="toggle-label">{dark ? "🌙" : "☀️"}</span>
            </button>
          </div>
          <label htmlFor="input">Type your text:</label>
          <input
            id="input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            placeholder="Start typing..."
            aria-label="Text input for word prediction"
            className={dark ? "dark" : ""}
          />
          <div className="suggestions">
            {suggestions.map((word, idx) => (
              <button
                key={word}
                className={`chip${selected === idx ? " selected" : ""}${dark ? " dark" : ""}`}
                onClick={() => insertSuggestion(idx)}
                tabIndex={0}
                aria-label={`Suggestion: ${word}`}
              >
                {word}
              </button>
            ))}
          </div>
          <div className="footer">
            Powered by GPT-2, runs fully offline.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
