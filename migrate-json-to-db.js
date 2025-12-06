// migrate-json-to-db.js
const { Pool } = require('pg');
const quotesData = require('./data.js'); // Your existing data.js

async function migrateData() {
  const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    console.log('Starting migration...');
    
    // Migrate all quotes
    for (const quote of quotesData.allQuotes) {
      await pool.query(
        `INSERT INTO quotes (text, author, category, likes, favorites) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT DO NOTHING`,
        [quote.text, quote.author, quote.category, quote.likes || 0, quote.favorites || 0]
      );
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

// Run migration
if (require.main === module) {
  require('dotenv').config();
  migrateData();
}
