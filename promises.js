// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your
// favorite number. (Make sure you get back JSON by including the json query key, specific to
// this API.

const baseURL = "http://numbersapi.com/";

let p = axios.get(`${baseURL}628/math?json`);

p.then(resp => console.log(resp.data));

// Figure out how to get data on multiple numbers in a single request. Make that request and
// when you get the data back, put all of the number facts on the page.

const factList = document.querySelector("#variousFacts");
const specificList = document.querySelector("#specificFacts");

axios
    .get(`${baseURL}2,3,9,26?json`)
    .then(resp => {
        for (const fact of Object.values(resp.data))
        {
            const entry = document.createElement("li");
            entry.innerText = fact;
            factList.appendChild(entry);
        }
    })
    
// Use the API to get 4 facts on your favorite number. Once you have them all, put them
// on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)

const promiseCluster = []
for (i=0; i<4; i++) {
    promiseCluster.push(axios.get(`${baseURL}5?json`))
}

Promise.all(promiseCluster)
    .then(resp => {
        console.log(resp)
        for (const fact of resp)
        {
            const entry = document.createElement("li");
            entry.innerText = fact.data.text;
            specificList.appendChild(entry);
        }
    })