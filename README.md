# 🚀 Word Prediction System

<p align="center">
  <img src="https://img.shields.io/badge/AI-GPT2-blueviolet?style=for-the-badge" alt="AI GPT2"/>
  <img src="https://img.shields.io/badge/Frontend-React-61dafb?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-Flask-000?style=for-the-badge&logo=flask" alt="Flask"/>
  <img src="https://img.shields.io/badge/Offline-Yes-brightgreen?style=for-the-badge" alt="Offline"/>
</p>


---

## ✨ Features

| ✍️ | **Next-word prediction** using GPT-2 (Hugging Face, runs locally) |
|----|---------------------------------------------------------------|
| ⚡ | **Live suggestions** as you type (3–5 options)                 |
| 🎨 | **Modern, accessible UI** (React, CSS, Google Fonts)           |
| 🌗 | **Dark/Bright mode toggle** with animated backgrounds          |
| ⌨️ | **Keyboard and mouse navigation** for suggestions              |
| 🔒 | **No API keys or external services required**                  |

---


---

## 🗂️ Project Structure
```
Word Prediction System/
├── backend/           # Flask API + GPT-2
│   ├── app.py
│   └── requirements.txt
├── frontend/          # React app
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Background.jsx
│   │   └── ...
│   └── ...
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend Setup (Flask + GPT-2)
```sh
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate
pip install -r requirements.txt
python app.py
```
- The first run will download the GPT-2 model (one-time, ~500MB).
- The backend runs at `http://localhost:5000`.

### 2. Frontend Setup (React)
```sh
cd frontend
npm install
npm run dev
```
- Open the local address shown in the terminal (e.g., `http://localhost:5173`).

---

## 🖥️ Usage
- Type in the input box. Suggestions appear as you type or after a space.
- Click a suggestion or use Tab/Arrow/Enter to insert.
- Use the 🌙/☀️ toggle to switch between dark and bright mode.

---

## ⚙️ Backend Details
- **Flask API** exposes `/predict` (POST) endpoint.
- Uses Hugging Face `transformers` and `torch` to load GPT-2.
- Returns top 3–5 next-word suggestions.
- All computation is local—no external API calls.

---

## 🎨 Frontend Details
- **React** (Vite) SPA.
- Modern, accessible design with Google Fonts (Inter, Poppins).
- Animated backgrounds: chat bubbles (bright), stars (dark).
- Responsive and mobile-friendly.

---

## 🛠️ Troubleshooting
- **Model download slow?** First run may take a few minutes.
- **No suggestions?** Ensure backend is running and accessible at `http://localhost:5000`.
- **CORS errors?** Backend uses `flask-cors`—should not occur.
- **Port conflicts?** Change the port in `app.py` or Vite config if needed.

---

## 📦 Dependencies
### Backend
- flask
- flask-cors
- torch
- transformers

### Frontend
- react
- react-dom
- vite

---

## 📄 License
MIT

---

## 🙏 Credits
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Google Fonts](https://fonts.google.com/)
