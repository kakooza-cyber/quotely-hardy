// api.js - All database API calls
const API_BASE = '/.netlify/functions';

class QuotelyAPI {
  // Get all quotes
  async getQuotes(category = 'all', limit = 50) {
    const url = category === 'all' 
      ? `${API_BASE}/get-quotes?limit=${limit}`
      : `${API_BASE}/get-quotes?category=${category}&limit=${limit}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch quotes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  }
  
  // Get daily quote (first quote by likes)
  async getDailyQuote() {
    const quotes = await this.getQuotes('all', 1);
    return quotes.length > 0 ? quotes[0] : null;
  }
  
  // Get quotes by category
  async getQuotesByCategory(category) {
    return await this.getQuotes(category);
  }
  
  // Submit new quote
  async submitQuote(quoteData) {
    try {
      const response = await fetch(`${API_BASE}/add-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
      
      if (!response.ok) throw new Error('Failed to submit quote');
      return await response.json();
    } catch (error) {
      console.error('Error submitting quote:', error);
      return null;
    }
  }
  
  // Like a quote
  async likeQuote(quoteId) {
    try {
      const response = await fetch(`${API_BASE}/like-quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId })
      });
      
      if (!response.ok) throw new Error('Failed to like quote');
      return await response.json();
    } catch (error) {
      console.error('Error liking quote:', error);
      return null;
    }
  }
  
  // Get categories from quotes
  async getCategories() {
    const quotes = await this.getQuotes();
    const categories = [...new Set(quotes.map(q => q.category))];
    return categories.filter(c => c); // Remove null/undefined
  }
}

// Export for use in HTML files
window.QuotelyAPI = new QuotelyAPI();
