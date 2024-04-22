// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your
// favorite number. (Make sure you get back JSON by including the json query key, specific to
// this API.

const baseURL = "http://numbersapi.com";

async function getOneFact(num) {
    resp = await axios.get(`${baseURL}/${num}/?json`);
    console.log(resp.data);
}

// Figure out how to get data on multiple numbers in a single request. Make that request and
// when you get the data back, put all of the number facts on the page.

const factList = document.querySelector("#variousFacts");

async function getVariousFacts(nums) {
    factList.innerHTML = "Getting facts..."
    resp = await axios.get(`${baseURL}/${nums.join()}/?json`)
    factList.innerHTML = ""
    for (const fact of Object.values(resp.data)) {
        {
            const entry = document.createElement("li");
            entry.innerText = fact;
            factList.appendChild(entry);
        }
    }
}

// Use the API to get 4 facts on your favorite number. Once you have them all, put them
// on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)

const specificList = document.querySelector("#specificFacts");

async function getSpecificFacts(num, count) {
    specificList.innerText = "Fetching your facts...";
    const promiseCluster = [];
    for (let i=0; i < count; i++){
        promiseCluster.push(axios.get(`${baseURL}/${num}/?json`))
    }
    
    resp = await Promise.all(promiseCluster)
    specificList.innerHTML = "";
    for (const fact of resp) {
        const entry = document.createElement("li");
        entry.innerText = fact.data.text;
        specificList.appendChild(entry);
    }
}