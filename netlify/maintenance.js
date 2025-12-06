exports.handler = async () => {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    
    await pool.query(`
      DELETE FROM quotes 
      WHERE created_at < NOW() - INTERVAL '90 days' 
      AND likes < 5
    `);
    
    
    await pool.query(`
      UPDATE quotes 
      SET is_daily = false 
      WHERE daily_date < CURRENT_DATE - INTERVAL '1 day'
    `);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Maintenance completed' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await pool.end();
  }
};
