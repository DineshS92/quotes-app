const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
const getQuote = async () => {
  showLoadingSpinner();
  const apiUrl = 'https://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    authorText.innerText = data.author;
    // Reduce font size for really long quotes
    if (data.content.length > 120) {
      quoteText.classList.add('long-quote')  
    } else {
      quoteText.classList.remove('long-quote')  
    }
    quoteText.innerText = data.content;
    // Stop loader and show quote
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
}

// Tweet Quote 
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listerners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load Page
getQuote();