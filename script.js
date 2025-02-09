const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" }
];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const saveQuoteBtn = document.getElementById("save-quote");
const toggleTheme = document.getElementById("toggle-theme");
const savedQuotesList = document.getElementById("saved-quotes");

// Function to generate a new quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteText.textContent = `"${quote.text}"`;
    authorText.textContent = `- ${quote.author}`;
}

// Function to save quote to local storage
function saveQuote() {
    const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    const currentQuote = { text: quoteText.textContent, author: authorText.textContent };
    
    savedQuotes.push(currentQuote);
    localStorage.setItem("quotes", JSON.stringify(savedQuotes));
    
    displaySavedQuotes();
}

// Function to display saved quotes
function displaySavedQuotes() {
    savedQuotesList.innerHTML = "";
    const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    
    savedQuotes.forEach((quote, index) => {
        const li = document.createElement("li");
        li.textContent = `${quote.text} ${quote.author}`;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
            savedQuotes.splice(index, 1);
            localStorage.setItem("quotes", JSON.stringify(savedQuotes));
            displaySavedQuotes();
        };
        
        li.appendChild(deleteBtn);
        savedQuotesList.appendChild(li);
    });
}

// Function to toggle theme
function toggleThemeMode() {
    document.body.classList.toggle("dark-mode");
}

// Event Listeners
newQuoteBtn.addEventListener("click", generateQuote);
saveQuoteBtn.addEventListener("click", saveQuote);
toggleTheme.addEventListener("change", toggleThemeMode);

// Load saved quotes on page load
displaySavedQuotes();
