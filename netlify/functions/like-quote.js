// Like a quote
const { Pool } = require('pg');

exports.handler = async (event, context) => {
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
    const { quoteId } = JSON.parse(event.body);
    
    if (!quoteId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Quote ID required' })
      };
    }
    
    // Increment likes
    const result = await pool.query(
      'UPDATE quotes SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [quoteId]
    );
    
    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Quote not found' })
      };
    }
    
    return {
      statusCode: 200,
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
