// define a global varabile that hnadle the HTML elemnet by javaScript DOM

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("newQuote-btn");
const loader = document.getElementById('loader');



// define a function that show loader
function showLoader() {
    loader.hidden = false;
    quoteContainer.classList.add('d-none')
    quoteContainer.classList.remove('d-block')



}

// define a function that hide loader
function hiddenLoader() {
    loader.hidden = true;
    quoteContainer.classList.add("d-block")
    quoteContainer.classList.remove('d-none')

}
// define a global array that handel the quote objects

let quoteFullData = [];
function genrateNewQuote() {
    // hide the loader untill it genrate new quiote
    showLoader();
    const newQoute = quoteFullData[Math.floor(Math.random() * quoteFullData.length)];
    quoteText.textContent = newQoute.text;
    if (newQoute.author == null) {
        newQoute.author = "Unkown"
    }
    else {
        author.textContent = newQoute.author;

    }
    // hide the loader ater finishing
    hiddenLoader();

}

// get the data of the API to our quoteFullData array of object

async function getQuotes() {
    showLoader();
    const ApiUrl = `https://type.fit/api/quotes`;
    try {
        const response = await fetch(ApiUrl);
        quoteFullData = await response.json();
        genrateNewQuote();

    } catch (error) {
        // Catch error here
    }
}
// calling getQuotes which will call genrateNewQuote which will display thr
getQuotes();

// twitter quote function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, "_blank");
}

// add click event listner to new-quote to genrate new button once it clicked
newQuoteBtn.addEventListener('click', genrateNewQuote);
// add click event listner on twitter button
twitterBtn.addEventListener('click', tweetQuote);