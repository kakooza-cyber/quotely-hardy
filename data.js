// data.js - Updated for Netlify Database
import { pool } from './database.js';

export const quotesData = {
  // Get daily quote
  async getDailyQuote() {
    const result = await pool.query(`
      SELECT * FROM quotes 
      WHERE is_daily = true 
      AND daily_date = CURRENT_DATE 
      LIMIT 1
    `);
    return result.rows[0];
  },

  // Get quotes by category
  async getQuotesByCategory(category) {
    const result = await pool.query(
      'SELECT * FROM quotes WHERE category = $1 ORDER BY likes DESC',
      [category]
    );
    return result.rows;
  },

  // Get all quotes with pagination
  async getAllQuotes(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await pool.query(
      'SELECT * FROM quotes ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  // Add new quote
  async addQuote(quote) {
    const result = await pool.query(
      `INSERT INTO quotes (text, author, category, source) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [quote.text, quote.author, quote.category, quote.source]
    );
    return result.rows[0];
  },

  // Like a quote
  async likeQuote(quoteId) {
    const result = await pool.query(
      'UPDATE quotes SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [quoteId]
    );
    return result.rows[0];
  },

  // Get proverbs
  async getProverbs() {
    const result = await pool.query(
      `SELECT * FROM quotes 
       WHERE category IN ('wisdom', 'proverb') 
       ORDER BY RANDOM() LIMIT 20`
    );
    return result.rows;
  }
};
