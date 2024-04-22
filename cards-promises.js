// Make a request to the Deck of Cards API to request a single card from a newly shuffle
// deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”,
// “queen of diamonds”).

const baseURL = "https://deckofcardsapi.com/api/deck/"
let deckID;

// axios
//     .get(`${baseURL}new/shuffle/?deck_count=1`)
//     .then(resp => {
//         deckID = resp.data.deck_id
//         return axios.get(`${baseURL}${deckID}/draw/`)
//     })
//     .then(resp => console.log(`${resp.data.cards[0].value.toLowerCase()} of ${resp.data.cards[0].suit.toLowerCase()}`));
    
// Make a request to the deck of cards API to request a single card from a newly shuffled
// deck. Once you have the card, make a request to the same API to get one more card from
// the same deck.

// const savedCards = [];

// axios
//     .get(`${baseURL}new/shuffle/?deck_count=1`)
//     .then(resp => {
//         deckID = resp.data.deck_id
//         return axios.get(`${baseURL}${deckID}/draw/`)
//     })
//     .then(resp => {
//         savedCards.push(resp.data.cards[0])
//         return axios.get(`${baseURL}${deckID}/draw/`)
//     })
//     .then(resp => {
//         savedCards.push(resp.data.cards[0])
//         for (card of savedCards) {
//             console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
//         }
//     })
    
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to
// the Deck of Cards API to create a new deck, and show a button on the page that will
// let you draw a card. Every time you click the button, display a new card, until there
// are no cards left in the deck.

const cardButtonHolder = document.querySelector("#cardButtonHolder")
const cardTable = document.querySelector("#cardTable")

axios
    .get(`${baseURL}new/shuffle/?deck_count=1`)
    .then(resp => {
        deckID = resp.data.deck_id;
        
        // render the draw card button to the DOM
        const el = document.createElement("button");
        el.innerText = "Draw a card";
        
        // remove the loading... text
        cardButtonHolder.innerText = "";
        cardButtonHolder.appendChild(el);
        
        // add an event handler
        el.addEventListener("click", evt => {
            axios.get(`${baseURL}${deckID}/draw/`)
                .then(resp => {
                    const img = document.createElement("img")
                    img.src = resp.data.cards[0].image
                    cardTable.prepend(img)
                    if (resp.data.remaining == 0) {
                        el.remove()
                    }
                })
        })
    })