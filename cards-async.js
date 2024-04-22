// Make a request to the Deck of Cards API to request a single card from a newly shuffle
// deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”,
// “queen of diamonds”).

const baseURL = "https://deckofcardsapi.com/api/deck/";

async function getOneCard() {
    deck = await axios.get(`${baseURL}new/shuffle/?deck_count=1`);
    let deckID = deck.data.deck_id;
    card = await axios.get(`${baseURL}${deckID}/draw/`);
    console.log(`${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`);
}

// Make a request to the deck of cards API to request a single card from a newly shuffled
// deck. Once you have the card, make a request to the same API to get one more card from
// the same deck.

async function getSomeCards(count) {
    deck = await axios.get(`${baseURL}new/shuffle/?deck_count=1`);
    let deckID = deck.data.deck_id;
    const cards = []
    // does this in a stupid way because the instructions say to ask one at a time
    // instead of using the API to request multiple cards
    for (let i=0; i < count; i++) {
        resp = await axios.get(`${baseURL}${deckID}/draw/`)
        cards.push(resp.data.cards[0])
    }
    for (card of cards) {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
    }
}
    
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to
// the Deck of Cards API to create a new deck, and show a button on the page that will
// let you draw a card. Every time you click the button, display a new card, until there
// are no cards left in the deck.

const cardButtonHolder = document.querySelector("#cardButtonHolder");
const cardTable = document.querySelector("#cardTable");
let deckID;

async function getDeck() {
    deck = await axios.get(`${baseURL}new/shuffle/?deck_count=1`);
    return deck.data.deck_id;
}

async function drawFromDeck(deckID) {
    resp = await axios.get(`${baseURL}${deckID}/draw/`);
    return resp
}

async function clickDrawButton(evt) {
    const img = document.createElement("img");
    resp = await drawFromDeck(deckID);
    img.src = resp.data.cards[0].image
    cardTable.prepend(img)
    
    // remove the button when the deck is empty
    if (resp.data.remaining === 0) {
        cardButtonHolder.innerText = "Deck empty!"
    }
}

async function init() {
    deckID = await getDeck()

    // make a button
    const btn = document.createElement("button");
    btn.innerText = "Draw a card";

    // remove the Loading... and replace it with the button
    cardButtonHolder.innerText = "";
    cardButtonHolder.appendChild(btn);

    btn.addEventListener("click", clickDrawButton)
}

init()