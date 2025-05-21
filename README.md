# Patient Registration App (Frontend-only)

This is a frontend-only patient registration app built using React (Vite) and Pglite (SQLite in WebAssembly).

## ✨ Features

- Register new patients
- Query data using raw SQL
- Data is persisted across refreshes using IndexedDB
- Real-time sync across multiple tabs

## 🚀 Getting Started

1. Clone the repo:
   git clone https://github.com/your-username/patient-registration-app.git
   cd patient-registration-app

2. Install dependencies:
   npm install

3. Run the app:
   npm run dev

4. Open in browser at `http://localhost:5173`

## 📦 Deployment

Deployed at: https://your-app-url.vercel.app

## 🧩 Challenges Faced

- Ensuring synchronization across tabs in a purely frontend app required using BroadcastChannel.
- Pglite's asynchronous nature meant structuring code carefully around async/await.
- Handling SQL errors gracefully without crashing the UI.

## 🔗 License

MIT
