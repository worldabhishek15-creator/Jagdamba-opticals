import pg from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, max: 10 });
export const query = (text, params=[]) => pool.query(text, params);
export async function initDb(){
  const here = path.dirname(fileURLToPath(import.meta.url));
  const schema = await fs.readFile(path.join(here,'../sql/schema.sql'),'utf8');
  await query(schema);
}
export { pool };