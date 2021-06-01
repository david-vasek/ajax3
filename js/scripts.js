'use strict';

fetch('https://swapi.dev/api/people/')
    .then(function (response) {  
         // Listens for the RESPONSE from fetch() (Promise #1)
        return response.json();
    })  
    .then(function (data) {
        //  Listens for the DATA from response.json() (Promise #2)
        buildContentCallback(data);
    })   
    .catch(function (error) {
        // Listens for a rejection from the fetch() Promise
        console.error('ERROR:', error);
        return error
    }); 
// This pattern  of "fetch()" is nearly identical to what you would do when working with most API's we'll be working with

function buildContentCallback(data) {
    console.log("the data is:", data.results);

    // 1. Create an unordered list
    // 2. Loop through the results array
    // 3. Create list item elements
    // 4. the list items will have the name values of each entry
    // 5. append list items to the unordered list
    // 6. Append the unordered list to the #root element
    const listOfNames = document.createElement('ul');
    const characters = data.results;

    characters.forEach(function (character) {
        const characterNameItem = document.createElement('li');
        characterNameItem.innerText = character.name;
        listOfNames.append(characterNameItem)

    });
   
    const root = document.querySelector('#root');
    root.append(listOfNames);
}


document.addEventListener('DOMContentLoaded', function () {
    // 1. Get the form Element
    // 2. Add an event listener for the form SUBMIT
    // 3. Get the value of the Input
    // 4. Use the value of the input to search the API
    // 5. Append the results to #searchResults

    const searchForm = document.querySelector('#searchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.querySelector('input');
        // console.log(searchInput.value);
        doSearch(searchInput.value);

    })
});

function doSearch(name) {
    console.log("searching for ", name);

    fetch(`https://swapi.dev/api/people/?search=${name}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("search response: ", data);
            // Before we even call the callback
            // Make sure we actually have data!
            if (data.count > 0) {
                buildSearchResults(data);
            }
        })
        .catch(function (error) {
            console.error("ERROR: ", error);
            return error;
        });
}

function buildSearchResults(data) {
    const searchResults = data.results;

    const searchResultsDiv = document.querySelector('#searchResults');

    searchResults.forEach(function (result) {
        const characterInfo = document.createElement('p');
        characterInfo.innerText = `${result.name} was born in ${result.birth_year}`
        searchResultsDiv.appendChild(characterInfo);
    })
}

