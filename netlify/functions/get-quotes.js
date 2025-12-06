// Get quotes from database
const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Create database connection
  const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    // Get query parameters
    const { category, limit = 50 } = event.queryStringParameters || {};
    
    let query = 'SELECT * FROM quotes';
    let params = [];
    
    // Add category filter if provided
    if (category && category !== 'all') {
      query += ' WHERE category = $1';
      params.push(category);
    }
    
    // Add ordering and limit
    query += ' ORDER BY likes DESC LIMIT $' + (params.length + 1);
    params.push(parseInt(limit));
    
    // Execute query
    const result = await pool.query(query, params);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.rows)
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    await pool.end();
  }
};
