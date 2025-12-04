// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Common elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const logoutBtn = document.querySelector('.btn-logout');
    
    // Login page elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');
    const loginContainer = document.querySelector('.login-container');
    const signupContainer = document.querySelector('.signup-container');
    
    // Dashboard elements
    const dailyQuote = document.getElementById('dailyQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quoteCategory = document.getElementById('quoteCategory');
    const quoteBackground = document.getElementById('quoteBackground');
    const likeBtn = document.getElementById('likeBtn');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const previousQuotes = document.getElementById('previousQuotes');
    const shareButtons = document.querySelectorAll('.share-btn');
    
    // Proverbs page elements
    const proverbSearch = document.getElementById('proverbSearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const proverbsGrid = document.getElementById('proverbsGrid');
    const loadMoreProverbs = document.getElementById('loadMoreProverbs');
    
    // Quotes page elements
    const viewButtons = document.querySelectorAll('.view-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    const authorFilter = document.getElementById('authorFilter');
    const sortFilter = document.getElementById('sortFilter');
    const quotesGrid = document.getElementById('quotesGrid');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');
    const submitQuoteLink = document.getElementById('submitQuoteLink');
    const submitQuoteModal = document.getElementById('submitQuoteModal');
    const quoteSubmissionForm = document.getElementById('quoteSubmissionForm');
    
    // About page elements
    const contactForm = document.getElementById('contactForm');
    
    // State variables
    let currentPage = 1;
    const quotesPerPage = 6;
    let displayedProverbs = 4;
    let currentQuoteStyle = 'grid';
    
    // ===== COMMON FUNCTIONS =====
    
    // Toggle mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Format date
    function formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Set current date
    function setCurrentDate() {
        const dateDisplay = document.getElementById('currentDate');
        if (dateDisplay) {
            dateDisplay.textContent = formatDate(new Date());
        }
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ===== LOGIN PAGE FUNCTIONS =====
    
    if (signupLink && loginLink) {
        // Switch to signup form
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.classList.add('hidden');
            signupContainer.classList.remove('hidden');
        });
        
        // Switch to login form
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Logging in...');
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Simulate signup process
            showNotification('Creating account...');
            
            // Switch to login after successful signup
            setTimeout(() => {
                signupContainer.classList.add('hidden');
                loginContainer.classList.remove('hidden');
                showNotification('Account created successfully! Please login.');
            }, 1500);
        });
    }
    
    // ===== DASHBOARD FUNCTIONS =====
    
    if (dailyQuote) {
        // Set current date
        setCurrentDate();
        
        // Load today's quote
        const todaysQuote = getTodaysQuote();
        updateQuoteDisplay(todaysQuote);
        
        // Load previous quotes
        loadPreviousQuotes();
        
        // Like button functionality
        likeBtn.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            const likeCount = this.querySelector('.like-count');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.style.color = '#dc3545';
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
                showNotification('Quote liked!');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.style.color = '';
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        });
        
        // Favorite button functionality
        favoriteBtn.addEventListener('click', function() {
            const starIcon = this.querySelector('i');
            
            if (starIcon.classList.contains('far')) {
                starIcon.classList.remove('far');
                starIcon.classList.add('fas');
                this.style.color = '#ffc107';
                showNotification('Added to favorites!');
            } else {
                starIcon.classList.remove('fas');
                starIcon.classList.add('far');
                this.style.color = '';
                showNotification('Removed from favorites');
            }
        });
        
        // Share buttons functionality
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.classList[1];
                const quote = dailyQuote.textContent;
                const author = quoteAuthor.textContent;
                const shareText = `${quote} - ${author}`;
                
                let url = '';
                
                switch(platform) {
                    case 'twitter':
                        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                        break;
                    case 'facebook':
                        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                        break;
                    case 'linkedin':
                        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(shareText)
                            .then(() => showNotification('Quote copied to clipboard!'));
                        return;
                }
                
                if (url) {
                    window.open(url, '_blank', 'width=600,height=400');
                }
            });
        });
        
        function updateQuoteDisplay(quote) {
            dailyQuote.textContent = quote.text;
            quoteAuthor.textContent = quote.author;
            quoteCategory.textContent = quote.category;
            
            if (quoteBackground) {
                quoteBackground.style.background = quote.background;
            }
            
            // Update author bio if element exists
            const authorBio = document.querySelector('.author-bio');
            if (authorBio && quote.authorBio) {
                authorBio.textContent = quote.authorBio;
            }
            
            // Update like count
            const likeCount = likeBtn.querySelector('.like-count');
            if (likeCount && quote.likes) {
                likeCount.textContent = quote.likes;
            }
        }
        
        function loadPreviousQuotes() {
            if (!previousQuotes) return;
            
            // Get yesterday's and day before yesterday's quotes
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            const dayBefore = new Date();
            dayBefore.setDate(dayBefore.getDate() - 2);
            const dayBeforeStr = dayBefore.toISOString().split('T')[0];
            
            const yesterdayQuote = quotesData.dailyQuotes.find(q => q.date === yesterdayStr) || quotesData.dailyQuotes[1];
            const dayBeforeQuote = quotesData.dailyQuotes.find(q => q.date === dayBeforeStr) || quotesData.dailyQuotes[2];
            
            const quotes = [yesterdayQuote, dayBeforeQuote].filter(q => q);
            
            previousQuotes.innerHTML = quotes.map(quote => `
                <div class="quote-item">
                    <div class="quote-text">${quote.text}</div>
                    <div class="quote-author">- ${quote.author}</div>
                    <div class="quote-meta">
                        <span class="quote-category">${quote.category}</span>
                        <div class="quote-actions-small">
                            <button class="btn-icon">
                                <i class="far fa-heart"></i>
                                <span>${quote.likes}</span>
                            </button>
                            <button class="btn-icon">
                                <i class="far fa-star"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // ===== PROVERBS PAGE FUNCTIONS =====
    
    if (proverbsGrid) {
        // Load initial proverbs
        loadProverbs();
        
        // Filter tags
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tag
                this.classList.add('active');
                
                // Filter proverbs
                const category = this.dataset.category;
                filterProverbs(category);
            });
        });
        
        // Search functionality
        if (proverbSearch) {
            proverbSearch.addEventListener('input', function() {
                const query = this.value.trim();
                if (query) {
                    searchProverbs(query);
                } else {
                    loadProverbs();
                }
            });
        }
        
        // Load more proverbs
        if (loadMoreProverbs) {
            loadMoreProverbs.addEventListener('click', function() {
                displayedProverbs += 4;
                loadProverbs();
            });
        }
        
        function loadProverbs() {
            const activeTag = document.querySelector('.filter-tag.active');
            const category = activeTag ? activeTag.dataset.category : 'all';
            const proverbs = getProverbsByCategory(category);
            
            displayProverbs(proverbs.slice(0, displayedProverbs));
        }
        
        function filterProverbs(category) {
            const proverbs = getProverbsByCategory(category);
            displayedProverbs = 4;
            displayProverbs(proverbs.slice(0, displayedProverbs));
        }
        
        function searchProverbs(query) {
            const proverbs = searchProverbs(query);
            displayProverbs(proverbs);
            
            // Update load more button
            if (loadMoreProverbs) {
                loadMoreProverbs.style.display = 'none';
            }
        }
        
        function displayProverbs(proverbs) {
            if (!proverbsGrid) return;
            
            if (proverbs.length === 0) {
                proverbsGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No proverbs found. Try a different search.</p>
                    </div>
                `;
                return;
            }
            
            proverbsGrid.innerHTML = proverbs.map(proverb => `
                <div class="proverb-card">
                    <div class="proverb-text">${proverb.text}</div>
                    <div class="proverb-origin">
                        <span class="proverb-meaning">${proverb.meaning}</span>
                        <span class="proverb-country">
                            <i class="fas fa-globe-americas"></i>
                            ${proverb.origin}
                        </span>
                    </div>
                    <div class="proverb-category">
                        <span class="category-tag">${proverb.category}</span>
                    </div>
                </div>
            `).join('');
            
            // Show/hide load more button
            if (loadMoreProverbs) {
                const activeTag = document.querySelector('.filter-tag.active');
                const category = activeTag ? activeTag.dataset.category : 'all';
                const allProverbs = getProverbsByCategory(category);
                
                loadMoreProverbs.style.display = 
                    displayedProverbs >= allProverbs.length ? 'none' : 'block';
            }
        }
    }
    
    // ===== QUOTES PAGE FUNCTIONS =====
    
    if (quotesGrid) {
        // Initialize
        populateAuthorFilter();
        loadQuotes();
        
        // View toggle
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentQuoteStyle = this.dataset.view;
                loadQuotes();
            });
        });
        
        // Filter changes
        categoryFilter.addEventListener('change', loadQuotes);
        authorFilter.addEventListener('change', loadQuotes);
        sortFilter.addEventListener('change', loadQuotes);
        
        // Pagination
        if (prevPage) {
            prevPage.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    loadQuotes();
                }
            });
        }
        
        if (nextPage) {
            nextPage.addEventListener('click', () => {
                currentPage++;
                loadQuotes();
            });
        }
        
        // Submit quote modal
        if (submitQuoteLink) {
            submitQuoteLink.addEventListener('click', (e) => {
                e.preventDefault();
                submitQuoteModal.classList.add('active');
            });
        }
        
        if (submitQuoteModal) {
            const modalClose = submitQuoteModal.querySelector('.modal-close');
            if (modalClose) {
                modalClose.addEventListener('click', () => {
                    submitQuoteModal.classList.remove('active');
                });
            }
            
            // Close modal when clicking outside
            submitQuoteModal.addEventListener('click', (e) => {
                if (e.target === submitQuoteModal) {
                    submitQuoteModal.classList.remove('active');
                }
            });
        }
        
        // Quote submission form
        if (quoteSubmissionForm) {
            quoteSubmissionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const quoteText = document.getElementById('quoteText').value;
                const quoteAuthor = document.getElementById('quoteAuthor').value;
                const quoteCategory = document.getElementById('quoteCategory').value;
                const userEmail = document.getElementById('userEmail').value;
                
                   // Validation
                if (!quoteText || !quoteAuthor || !quoteCategory || !userEmail) {
                    showNotification('Please fill in all required fields', 'error');
                    return;
                }
                
                // Simulate submission
                showNotification('Thank you for submitting your quote! It will be reviewed by our team.');
                
                // Close modal and reset form
                submitQuoteModal.classList.remove('active');
                quoteSubmissionForm.reset();
            });
        }
        
        function populateAuthorFilter() {
            if (!authorFilter) return;
            
            quotesData.authors.forEach(author => {
                const option = document.createElement('option');
                option.value = author;
                option.textContent = author;
                authorFilter.appendChild(option);
            });
        }
        
        function loadQuotes() {
            let quotes = quotesData.allQuotes;
            
            // Apply filters
            const category = categoryFilter.value;
            const author = authorFilter.value;
            
            if (category !== 'all') {
                quotes = quotes.filter(q => q.category === category);
            }
            
            if (author !== 'all') {
                quotes = quotes.filter(q => q.author === author);
            }
            
            // Apply sorting
            const sortBy = sortFilter.value;
            switch(sortBy) {
                case 'popular':
                    quotes.sort((a, b) => b.likes - a.likes);
                    break;
                case 'recent':
                    // For demo, sort by ID descending
                    quotes.sort((a, b) => b.id - a.id);
                    break;
                case 'oldest':
                    quotes.sort((a, b) => a.id - b.id);
                    break;
                case 'random':
                    quotes = quotes.sort(() => Math.random() - 0.5);
                    break;
            }
            
            // Pagination
            const totalPages = Math.ceil(quotes.length / quotesPerPage);
            const startIndex = (currentPage - 1) * quotesPerPage;
            const endIndex = startIndex + quotesPerPage;
            const paginatedQuotes = quotes.slice(startIndex, endIndex);
            
            // Display quotes
            displayQuotes(paginatedQuotes);
            
            // Update pagination
            updatePagination(totalPages);
        }
        
        function displayQuotes(quotes) {
            if (!quotesGrid) return;
            
            if (quotes.length === 0) {
                quotesGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-quote-right"></i>
                        <p>No quotes found. Try changing your filters.</p>
                    </div>
                `;
                return;
            }
            
            if (currentQuoteStyle === 'grid') {
                quotesGrid.className = 'quotes-grid';
                quotesGrid.innerHTML = quotes.map(quote => `
                    <div class="quote-card quote-style-${quote.style}">
                        ${quote.style === 'image' ? `
                            <div class="quote-background" style="background: ${quote.background}"></div>
                            <div class="quote-content">
                                <div class="quote-meta">
                                    <span class="category-tag">${quote.category}</span>
                                    <div class="quote-actions-small">
                                        <button class="btn-icon">
                                            <i class="far fa-heart"></i>
                                            <span>${quote.likes}</span>
                                        </button>
                                        <button class="btn-icon">
                                            <i class="far fa-star"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="quote-text">${quote.text}</div>
                                <div class="quote-author">- ${quote.author}</div>
                            </div>
                        ` : `
                            <div class="quote-content">
                                <div class="quote-meta">
                                    <span class="category-tag">${quote.category}</span>
                                    <div class="quote-actions-small">
                                        <button class="btn-icon">
                                            <i class="far fa-heart"></i>
                                            <span>${quote.likes}</span>
                                        </button>
                                        <button class="btn-icon">
                                            <i class="far fa-star"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="quote-text">${quote.text}</div>
                                <div class="quote-author">- ${quote.author}</div>
                            </div>
                        `}
                    </div>
                `).join('');
            } else {
                quotesGrid.className = 'quotes-list';
                quotesGrid.innerHTML = `
                    <table class="quotes-table">
                        <thead>
                            <tr>
                                <th>Quote</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Likes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${quotes.map(quote => `
                                <tr>
                                    <td>${quote.text}</td>
                                    <td>${quote.author}</td>
                                    <td><span class="category-tag">${quote.category}</span></td>
                                    <td>${quote.likes}</td>
                                    <td>
                                        <div class="quote-actions-small">
                                            <button class="btn-icon">
                                                <i class="far fa-heart"></i>
                                            </button>
                                            <button class="btn-icon">
                                                <i class="far fa-star"></i>
                                            </button>
                                            <button class="btn-icon">
                                                <i class="fas fa-share-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
            
            // Add event listeners to like/favorite buttons
            quotesGrid.querySelectorAll('.btn-icon').forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon.classList.contains('fa-heart')) {
                    btn.addEventListener('click', function() {
                        if (icon.classList.contains('far')) {
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                            this.style.color = '#dc3545';
                            
                            // Update like count
                            const countSpan = this.querySelector('span');
                            if (countSpan) {
                                countSpan.textContent = parseInt(countSpan.textContent) + 1;
                            }
                            
                            showNotification('Quote liked!');
                        } else {
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                            this.style.color = '';
                            
                            // Update like count
                            const countSpan = this.querySelector('span');
                            if (countSpan) {
                                countSpan.textContent = parseInt(countSpan.textContent) - 1;
                            }
                        }
                    });
                } else if (icon.classList.contains('fa-star')) {
                    btn.addEventListener('click', function() {
                        if (icon.classList.contains('far')) {
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                            this.style.color = '#ffc107';
                            showNotification('Added to favorites!');
                        } else {
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                            this.style.color = '';
                            showNotification('Removed from favorites');
                        }
                    });
                }
            });
        }
        
        function updatePagination(totalPages) {
            if (!pageNumbers || !prevPage || !nextPage) return;
            
            // Update page numbers
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    loadQuotes();
                });
                pageNumbers.appendChild(pageBtn);
            }
            
            // Update prev/next buttons
            prevPage.disabled = currentPage === 1;
            nextPage.disabled = currentPage === totalPages;
        }
    }
    
    // ===== ABOUT PAGE FUNCTIONS =====
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate sending message
            showNotification('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
    
    // ===== HELPER FUNCTIONS =====
    
    // Get today's quote (from data.js)
    function getTodaysQuote() {
        const today = new Date().toISOString().split('T')[0];
        const dailyQuote = quotesData.dailyQuotes.find(quote => quote.date === today);
        return dailyQuote || quotesData.dailyQuotes[0];
    }
    
    // Get proverbs by category (from data.js)
    function getProverbsByCategory(category) {
        if (category === 'all') return quotesData.proverbs;
        return quotesData.proverbs.filter(proverb => proverb.category === category);
    }
    
    // Search proverbs (from data.js)
    function searchProverbs(query) {
        const searchTerm = query.toLowerCase();
        return quotesData.proverbs.filter(proverb => 
            proverb.text.toLowerCase().includes(searchTerm) ||
            proverb.origin.toLowerCase().includes(searchTerm) ||
            proverb.category.toLowerCase().includes(searchTerm)
        );
    }
});
                
