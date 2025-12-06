-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(255),
  category VARCHAR(100),
  source VARCHAR(500),
  likes INTEGER DEFAULT 0,
  favorites INTEGER DEFAULT 0,
  is_daily BOOLEAN DEFAULT false,
  daily_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  quote_id INTEGER REFERENCES quotes(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quote_id)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('motivation', 'Quotes to inspire action'),
('success', 'Quotes about achieving goals'),
('life', 'Quotes about life and living'),
('love', 'Quotes about love and relationships'),
('wisdom', 'Wise sayings and proverbs'),
('inspiration', 'Quotes to spark creativity');

-- Insert sample quotes
INSERT INTO quotes (text, author, category, likes) VALUES
('The only way to do great work is to love what you do.', 'Steve Jobs', 'motivation', 245),
('Life is what happens to you while''re busy making other plans.', 'John Lennon', 'life', 189),
('The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt', 'inspiration', 312);
