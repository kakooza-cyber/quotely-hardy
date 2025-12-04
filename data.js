// Quotes Database
const quotesData = {
    dailyQuotes: [
        {
            id: 1,
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            category: "motivation",
            likes: 245,
            favorites: 189,
            date: "2024-01-15",
            authorBio: "American entrepreneur and co-founder of Apple Inc.",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            text: "Life is what happens to you while you're busy making other plans.",
            author: "John Lennon",
            category: "life",
            likes: 189,
            favorites: 156,
            date: "2024-01-14",
            authorBio: "English singer, songwriter, and peace activist",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt",
            category: "inspiration",
            likes: 312,
            favorites: 267,
            date: "2024-01-13",
            authorBio: "American political figure, diplomat, and activist",
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        }
    ],
    
    proverbs: [
        {
            id: 1,
            text: "A journey of a thousand miles begins with a single step.",
            origin: "Chinese",
            meaning: "Even the biggest project starts with small actions.",
            category: "perseverance"
        },
        {
            id: 2,
            text: "When the going gets tough, the tough get going.",
            origin: "American",
            meaning: "Strong people take action when facing challenges.",
            category: "perseverance"
        },
        {
            id: 3,
            text: "A friend in need is a friend indeed.",
            origin: "English",
            meaning: "A true friend helps you when you need help.",
            category: "friendship"
        },
        {
            id: 4,
            text: "Where there's a will, there's a way.",
            origin: "English",
            meaning: "If you are determined enough, you can find a solution.",
            category: "success"
        },
        {
            id: 5,
            text: "Actions speak louder than words.",
            origin: "English",
            meaning: "What you do is more important than what you say.",
            category: "wisdom"
        },
        {
            id: 6,
            text: "Better late than never.",
            origin: "Latin",
            meaning: "It's better to do something late than not do it at all.",
            category: "life"
        },
        {
            id: 7,
            text: "Don't count your chickens before they hatch.",
            origin: "English",
            meaning: "Don't make plans based on events that haven't happened.",
            category: "wisdom"
        },
        {
            id: 8,
            text: "Every cloud has a silver lining.",
            origin: "English",
            meaning: "There's something good in every bad situation.",
            category: "happiness"
        }
    ],
    
    allQuotes: [
        {
            id: 1,
            text: "Be the change that you wish to see in the world.",
            author: "Mahatma Gandhi",
            category: "inspiration",
            likes: 456,
            favorites: 321,
            style: "minimal"
        },
        {
            id: 2,
            text: "In three words I can sum up everything I've learned about life: it goes on.",
            author: "Robert Frost",
            category: "life",
            likes: 389,
            favorites: 245,
            style: "typography"
        },
        {
            id: 3,
            text: "If you tell the truth, you don't have to remember anything.",
            author: "Mark Twain",
            category: "wisdom",
            likes: 278,
            favorites: 189,
            style: "minimal"
        },
        {
            id: 4,
            text: "I have not failed. I've just found 10,000 ways that won't work.",
            author: "Thomas Edison",
            category: "success",
            likes: 512,
            favorites: 398,
            style: "typography"
        },
        {
            id: 5,
            text: "A room without books is like a body without a soul.",
            author: "Marcus Tullius Cicero",
            category: "wisdom",
            likes: 234,
            favorites: 167,
            style: "image",
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        },
        {
            id: 6,
            text: "You only live once, but if you do it right, once is enough.",
            author: "Mae West",
            category: "life",
            likes: 421,
            favorites: 345,
            style: "minimal"
        },
        {
            id: 7,
            text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
            author: "Ralph Waldo Emerson",
            category: "inspiration",
            likes: 367,
            favorites: 289,
            style: "typography"
        },
        {
            id: 8,
            text: "It is never too late to be what you might have been.",
            author: "George Eliot",
            category: "motivation",
            likes: 298,
            favorites: 234,
            style: "minimal"
        },
        {
            id: 9,
            text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
            author: "Albert Einstein",
            category: "life",
            likes: 543,
            favorites: 456,
            style: "image",
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        },
        {
            id: 10,
            text: "The only thing we have to fear is fear itself.",
            author: "Franklin D. Roosevelt",
            category: "motivation",
            likes: 389,
            favorites: 312,
            style: "typography"
        }
    ],
    
    categories: [
        "motivation", "success", "life", "love", "inspiration", "wisdom"
    ],
    
    authors: [
        "Steve Jobs", "John Lennon", "Eleanor Roosevelt", "Mahatma Gandhi",
        "Robert Frost", "Mark Twain", "Thomas Edison", "Marcus Tullius Cicero",
        "Mae West", "Ralph Waldo Emerson", "George Eliot", "Albert Einstein",
        "Franklin D. Roosevelt"
    ]
};

// Function to get today's quote
function getTodaysQuote() {
    const today = new Date().toISOString().split('T')[0];
    const dailyQuote = quotesData.dailyQuotes.find(quote => quote.date === today);
    return dailyQuote || quotesData.dailyQuotes[0];
}

// Function to get quotes by category
function getQuotesByCategory(category) {
    if (category === 'all') return quotesData.allQuotes;
    return quotesData.allQuotes.filter(quote => quote.category === category);
}

// Function to get quotes by author
function getQuotesByAuthor(author) {
    if (author === 'all') return quotesData.allQuotes;
    return quotesData.allQuotes.filter(quote => quote.author === author);
}

// Function to get proverbs by category
function getProverbsByCategory(category) {
    if (category === 'all') return quotesData.proverbs;
    return quotesData.proverbs.filter(proverb => proverb.category === category);
}

// Function to search quotes
function searchQuotes(query) {
    const searchTerm = query.toLowerCase();
    return quotesData.allQuotes.filter(quote => 
        quote.text.toLowerCase().includes(searchTerm) ||
        quote.author.toLowerCase().includes(searchTerm) ||
        quote.category.toLowerCase().includes(searchTerm)
    );
}

// Function to search proverbs
function searchProverbs(query) {
    const searchTerm = query.toLowerCase();
    return quotesData.proverbs.filter(proverb => 
        proverb.text.toLowerCase().includes(searchTerm) ||
        proverb.origin.toLowerCase().includes(searchTerm) ||
        proverb.category.toLowerCase().includes(searchTerm)
    );
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        quotesData,
        getTodaysQuote,
        getQuotesByCategory,
        getQuotesByAuthor,
        getProverbsByCategory,
        searchQuotes,
        searchProverbs
    };
          }
