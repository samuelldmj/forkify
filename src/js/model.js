// Polyfill for async/await functionality in environments that do not support it
import 'regenerator-runtime/runtime';

// Import constants and helper functions
import { APP_URL, RECIPE_PER_PAGE } from './config';
import { getJSON } from './helpers';

// Application state object to hold recipe and search data
export const state = {
    recipe: {}, // Object to store the currently loaded recipe
    search: {
        query: '', // Current search query
        results: [], // Array to store search results (recipes)
        resultsPerPage: RECIPE_PER_PAGE, // Number of results to display per page
        currentPageNumber: 1 // Current page number for displaying results
    },
}

// Function to load a recipe by its ID
export const loadRecipe = async function (id) {
    try {
        // Fetch recipe data from the API using the provided ID
        const data = await getJSON(`${APP_URL}${id}`);

        // Destructure the recipe data from the response
        const { recipe } = data.data;

        // Store the relevant recipe information in the state
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
    } catch (err) {
        // Throw an error if the API call fails
        throw err;
    }
}

// Function to load search results based on a query
export const loadSearchResult = async function (query) {
    try {
        // Store the search query in the state
        state.search.query = query;

        // Fetch search results from the API using the query
        const data = await getJSON(`${APP_URL}?search=${query}`);

        // Map the results to a simplified format and store them in the state
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })
    } catch (err) {
        // Throw an error if the API call fails
        throw err;
    }
}

// Function to get a specific page of search results
export const getSearchResultPage = function (currentPageNumber = state.search.currentPageNumber) {
    // Update the current page number in the state
    state.search.currentPageNumber = currentPageNumber;

    // Calculate the start and end indices for slicing the results array
    const start = (currentPageNumber - 1) * state.search.resultsPerPage;
    const end = currentPageNumber * state.search.resultsPerPage;

    // Log the start and end indices for debugging purposes
    console.log(start, end);

    // Return the sliced array of results for the current page
    return state.search.results.slice(start, end);
}
