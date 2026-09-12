# AI Ammavan 😐🎯

## Basic Details

### Team Name: [Your Team Name]

### Team Members

* **Team Lead:** Fadi NA - CUIET
* **Member 2:** Sourav Das M - CUIET


### Project Description

**AI Ammavan** is an AI-powered conversational assistant that brings the classic “Ammavan” personality into the digital world. It provides witty, sarcastic, unsolicited advice and entertaining responses using modern Generative AI APIs.

### The Problem (that doesn't exist)

The world is suffering from a serious shortage of **unwanted advice, unnecessary opinions, and unsolicited life lessons**. People can no longer receive instant “Back in my days…” lectures whenever they make a simple decision.

### The Solution (that nobody asked for)

**AI Ammavan** solves this completely unnecessary problem by creating a virtual Ammavan who is available 24/7. Ask anything and receive a combination of AI-powered answers, sarcasm, life advice, and classic Ammavan-style commentary — whether you asked for it or not. 😐

---

## Technical Details

### Technologies/Components Used

### For Software

* **Languages used:**

  * Python
  * JavaScript
  * HTML
  * CSS

* **Frameworks used:**

  * Flask

* **Libraries used:**

  * Flask-CORS
  * python-dotenv
  * Sarvam AI SDK
  * Google GenAI SDK
  * Gunicorn

* **Tools used:**

  * Visual Studio Code
  * Git
  * GitHub
  * Render
  * Python Virtual Environment (`venv`)
  * REST API

### For Hardware

* No dedicated hardware required.
* Runs on a standard computer/laptop with an internet connection.

---

## Implementation

### For Software

### Installation

Clone the repository:

```bash
git clone https://github.com/faduoo/ai-ammavamv3
```

Navigate to the backend:

```bash
cd ai-ammavamv3/backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file inside the backend directory and add the required API keys:

```env
GOOGLE_API_KEY=********************65t
SARVAM_API_KEY=*******************d4
```

**Do not upload your `.env` file or API keys to GitHub.**

### Run

Start the Flask backend:

```bash
python app.py
```

The application will run locally at:

```text
http://127.0.0.1:5000
```

### Production Deployment

The backend can be deployed using **Gunicorn**:

```bash
gunicorn app:app
```

For Render deployment:

```text
Build Command:
pip install -r requirements.txt

Start Command:
gunicorn app:app
```

---

## Project Documentation

### For Software

# Screenshots

![Screenshot1](Add screenshot 1 here)

*AI Ammavan homepage/interface showing the conversational chat experience.*

![Screenshot2](Add screenshot 2 here)

*User entering a question and interacting with AI Ammavan.*

![Screenshot3](Add screenshot 3 here)

*AI Ammavan generating a humorous and intelligent response.*

# Diagrams

![Workflow](Add workflow/architecture diagram here)

*User → Frontend → Flask Backend → AI APIs → Generated Ammavan Response → Frontend*

---

## Project Demo

* GitHub Repository: https://github.com/faduoo/ai-ammavamv3
* Live Demo: https://ai-ammavan.vercel.app/

---

## Team Contributions

* **SOURAV DAS M:** Backend development, Flask API integration, AI API integration, and deployment.
* **FADI NA:** Frontend development, UI/UX design, and frontend-backend integration.
---

## Architecture

```text
                    ┌─────────────────────┐
                    │       USER          │
                    │  Ask Ammavan a      │
                    │     Question        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FRONTEND       │
                    │   HTML/CSS/JS UI    │
                    └──────────┬──────────┘
                               │
                               │ API Request
                               ▼
                    ┌─────────────────────┐
                    │    FLASK BACKEND    │
                    │      app.py         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   AMMAVAN ENGINE    │
                    │     ammavan.py      │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             ┌─────────────┐       ┌─────────────┐
             │  Google     │       │  Sarvam AI  │
             │  GenAI      │       │     API     │
             └──────┬──────┘       └──────┬──────┘
                    │                     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ AI AMMAVAN RESPONSE │
                    │  Witty + Helpful +  │
                    │      Sarcastic      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       USER          │
                    │   Gets the answer   │
                    └─────────────────────┘
```

---

## Why AI Ammavan?

Because sometimes you don't need another AI assistant.

You need an **Ammavan who thinks he's the smartest person in the room.** 😐

**Ask a question → Get an answer → Get advice you didn't ask for → Learn something anyway.**

---

Made with ❤️ at **TinkerHub Useless Projects**

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000\&link=https%3A%2F%2Fwww.tinkerhub.org%2F)

![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
