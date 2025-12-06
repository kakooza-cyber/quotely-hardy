// database.js - Netlify Database Connection
import { createClient } from '@supabase/supabase-js';

// For Netlify Functions (server-side)
export const supabase = createClient(
  process.env.NETLIFY_DATABASE_URL,
  process.env.NETLIFY_DATABASE_ANON_KEY
);

// OR direct PostgreSQL connection
import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
