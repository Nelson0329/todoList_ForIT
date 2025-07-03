import { openDb } from '../db/db.js';

// GET /api/tasks
export const getAllTasks = async (req, res) => {
  try {
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Falta el título' });

    const createdAt = new Date().toISOString();
    const db = await openDb();
    const result = await db.run(
      'INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)',
      [title, description || '', 0, createdAt]
    );
    const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', [result.lastID]);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};


// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const db = await openDb();
    await db.run(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description || '', completed ? 1 : 0, id]
    );

    const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await openDb();
    await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};
