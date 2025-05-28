# Patient Registration App (Frontend-only)

This is a frontend-only patient registration app built using React (Vite) and Pglite.

## ✨ Features

- Register new patients
- Query data using raw SQL
- Data is persisted across refreshes using IndexedDB
- Real-time sync across multiple tabs

## 🚀 Getting Started

1. Clone the repo:
git clone https://github.com/Tahirkhan7/patient-registration
cd patient-registration-app


2. Install dependencies:
npm install --force


3. Run the app:
npm run dev


4. Open in browser at `http://localhost:3000`

## 📦 Deployment

Deployed at: https://patient-registration-y983.vercel.app/

## 🧩 Challenges Faced

- Pglite's asynchronous nature meant structuring code carefully around async/await.
- Handling SQL errors gracefully without crashing the UI.

## 🔗 License

MIT
