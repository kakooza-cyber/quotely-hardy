const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Add authentication check here if needed
  const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_quotes,
        COUNT(DISTINCT author) as unique_authors,
        COUNT(DISTINCT category) as categories_count,
        SUM(likes) as total_likes,
        MAX(likes) as most_likes
      FROM quotes
    `);
    
    const popularCategories = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM quotes
      GROUP BY category
      ORDER BY count DESC
      LIMIT 5
    `);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        stats: stats.rows[0],
        popularCategories: popularCategories.rows
      })
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
