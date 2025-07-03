import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const openDb = async () => {
  return open({
    filename: `${__dirname}/../data/tasks.db`,
    driver: sqlite3.Database,
  });
};
