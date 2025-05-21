import { PGlite } from "@electric-sql/pglite";

let db;
const channel = new BroadcastChannel("pglite-sync");

export const initDb = async () => {
  if (!db) {
    db = new PGlite("idb://patients");
    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT,
        contact TEXT,
        created_at TEXT
      );
    `);
  }
  return db;
};

export const getDb = () => db;
export const broadcastUpdate = () => channel.postMessage("update");
export const subscribeToUpdates = (callback) => {
  channel.onmessage = (e) => {
    if (e.data === "update") callback();
  };
};

export const syncAcrossTabs = (callback) => {
  channel.onmessage = (event) => {
    if (event.data === "db-updated") {
      callback();
    }
  };
};

export const notifyUpdate = () => {
  channel.postMessage("db-updated");
};
