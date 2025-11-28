# 🚀 AI Agent Semantic Search Chrome Extension

A lightweight Chrome Extension that simulates a modern **AI Agent** using:
- 🧠 Local Semantic Search (vector embeddings + cosine similarity)
- 🔎 Local Keyword Search
- 🧩 Rule-Based Planner (tool selection)
- 📉 Confidence Scoring
- 🛟 Pinecone-Style Fallback (simulated)
- 🪟 Chrome Extension Popup UI (Manifest V3)
- 📊 Structured JSON output with trace

This project teaches the fundamentals of **AI reasoning**, **tool selection**, **embeddings**, and **semantic search** — all implemented using **pure JavaScript** with no external APIs.

---

User enters a query → agent processes it using:
1. Semantic Search  
2. Keyword Search  
3. Planner decides the best tool  
4. Confidence threshold applied  
5. Pinecone fallback simulated if needed  
6. Clean JSON result shown in popup  

---

## 📁 Project Structure

| File                 | Description                                   |
|----------------------|-----------------------------------------------|
| `manifest.json`      | Chrome MV3 config                             |
| `popup.html`         | Extension popup UI                            |
| `popup.js`           | Handles user input + displays results         |
| `background.js`      | Communicates with agent logic                 |
| `agent.js`           | Planner + tools + confidence + fallback       |
| `data.js`            | Local documents dataset                       |
| `utils.js`           | Embedding + cosine similarity helpers         |

## 🚀 Installation & Setup

### 1. Clone Repo
```bash
git clone https://github.com/your-username/ai-agent-extension.git
```
### 2. Clone Repo
- Open in Chrome
- Go to chrome://extensions
- Enable Developer Mode
- Click Load Unpacked
- Select the project folder

### 3. Run
- Click the extension icon → enter a query → see results.

## 📚 Technologies Used
- JavaScript (ES Modules)
- Chrome Extensions API (Manifest V3)
- Cosine Similarity
- Bag-of-Words Vectorization
- Rule-based AI Planning
- JSON Traces

## 🎯 Learning Objectives
- ✔ Understand what embeddings are
- ✔ Implement bag-of-words semantic search
- ✔ Compute cosine similarity
- ✔ Compare semantic vs keyword search
- ✔ Implement AI tool-selection logic
- ✔ Simulate fallback (Pinecone-style)
- ✔ Build Chrome extensions with MV3 architecture