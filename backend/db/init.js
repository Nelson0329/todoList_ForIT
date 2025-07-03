import { openDb } from './db.js';

const setup = async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
  `);
  console.log('✅ Base de datos y tabla creada');
};

setup();
