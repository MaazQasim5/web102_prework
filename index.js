/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>${"Backers: " + game.backers}</p>
        `;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

    const contributionsCard = document.getElementById("num-contributions");
    const raisedCard = document.getElementById("total-raised");
    const gamesCard = document.getElementById("num-games");

    const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
        return accumulator + game.backers;
    }, 0);
    contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

    const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
        return accumulator + game.pledged;
    }, 0);
    raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

    const totalGames = GAMES_JSON.length;
    gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// optional feature search bar
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();

    const filteredGames = GAMES_JSON.filter((game) =>
        game.name.toLowerCase().includes(searchText)
    );

    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
});

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.reduce((accumulator, game) => {
    accumulator += (game.pledged < game.goal) ? 1 : 0;
    return accumulator;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const unfundedString = `A total of ${totalRaised.toLocaleString()} has been raised for ${totalGames} game${(totalGames != 1) ? `s` : ``}. Currently, ${numUnfunded} game${(numUnfunded != 1) ? `s` : ``} remain${(numUnfunded != 1) ? `s` : ``} unfunded. We need your help to find these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const stringaling = document.createElement("div");
stringaling.textContent = unfundedString;
descriptionContainer.append(stringaling);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame] = [sortedGames[0].name, sortedGames[1].name];
// create a new element to hold the name of the top pledge game, then append it to the correct element
const elFirstGame = document.createElement("div");
elFirstGame.textContent = `${firstGame}`;
firstGameContainer.append(elFirstGame);
// do the same for the runner up item
const elSecondGame = document.createElement("div");
elSecondGame.textContent = `${secondGame}`;
secondGameContainer.append(elSecondGame);