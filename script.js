// script.js - Updated for Netlify Functions

// Base URL for Netlify Functions
const API_BASE = '/.netlify/functions';

// Fetch quotes from database
async function fetchQuotes(category = 'all', page = 1) {
  try {
    const url = category === 'all' 
      ? `${API_BASE}/get-quotes?page=${page}`
      : `${API_BASE}/get-quotes?category=${category}&page=${page}`;
    
    const response = await fetch(url);
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

// Add new quote
async function submitQuote(quoteData) {
  try {
    const response = await fetch(`${API_BASE}/add-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error adding quote:', error);
    return null;
  }
}

// Like a quote
async function likeQuote(quoteId) {
  try {
    const response = await fetch(`${API_BASE}/like-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quoteId })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error liking quote:', error);
    return null;
  }
}

// Update dashboard to use real data
async function updateDailyQuote() {
  const quotes = await fetchQuotes();
  if (quotes.length > 0) {
    const dailyQuote = quotes[0]; // Get first quote or implement daily logic
    document.getElementById('dailyQuote').textContent = dailyQuote.text;
    document.getElementById('quoteAuthor').textContent = dailyQuote.author;
    document.getElementById('quoteCategory').textContent = dailyQuote.category;
    
    // Update like button
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = likeBtn.querySelector('.like-count');
    likeCount.textContent = dailyQuote.likes;
    
    // Update like functionality
    likeBtn.onclick = async () => {
      const updated = await likeQuote(dailyQuote.id);
      if (updated) {
        likeCount.textContent = updated.likes;
        showNotification('Quote liked!');
      }
    };
  }
  }
