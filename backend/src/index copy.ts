import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 50001;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
