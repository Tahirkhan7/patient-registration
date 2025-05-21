import { Pglite } from '@electric-sql/pglite'

let db;
const BC = new BroadcastChannel("pglite-sync");

export const initDb = async () => {
  if (!db) {
    db = new Pglite('idb://patient-db');
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

export const syncAcrossTabs = (callback) => {
  BC.onmessage = (event) => {
    if (event.data === 'db-updated') {
      callback();
    }
  };
};

export const notifyUpdate = () => {
  BC.postMessage('db-updated');
};
