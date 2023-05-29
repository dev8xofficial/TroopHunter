import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import pgPromise from 'pg-promise';

dotenv.config();

const app = express();
const port = process.env.PORT || 50001;

// Database configuration
const pgp = pgPromise();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = pgp(process.env.DATABASE_URL ? process.env.DATABASE_URL : '');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// CRUD operations
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    await db.none('INSERT INTO users (name, email) VALUES ($1, $2)', [
      name,
      email,
    ]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await db.none('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
      name,
      email,
      id,
    ]);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
