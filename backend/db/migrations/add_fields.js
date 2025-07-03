import { openDb } from '../db.js';

const migrate = async () => {
  const db = await openDb();
  await db.exec(`ALTER TABLE tasks ADD COLUMN description TEXT DEFAULT '';`);
  await db.exec(`ALTER TABLE tasks ADD COLUMN createdAt TEXT DEFAULT '';`);
  console.log('🚀 Migración completada: description y createdAt agregados.');
};

migrate();