// Add a new quote
const { Pool } = require('pg');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    // Parse the request body
    const { text, author, category, source } = JSON.parse(event.body);
    
    // Validate required fields
    if (!text || !author || !category) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // Insert into database
    const result = await pool.query(
      `INSERT INTO quotes (text, author, category, source) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [text, author, category, source || '']
    );
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.rows[0])
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
