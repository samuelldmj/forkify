// Polyfill for async/await functionality in environments that do not support it
import 'regenerator-runtime/runtime';

// Import constants and helper functions
import { APP_URL, RECIPE_PER_PAGE } from './config'; // APP_URL: API base URL, RECIPE_PER_PAGE: Results per page
import { getJSON } from './helpers'; // Helper function for making GET requests

// Application state object to hold recipe and search data
export const state = {
    recipe: {}, // Object to store the currently loaded recipe
    search: {
        query: '', // Current search query entered by the user
        results: [], // Array to store search results (recipes)
        resultsPerPage: RECIPE_PER_PAGE, // Number of results to display per page
        currentPageNumber: 1, // Current page number for pagination
    },
    bookmark: [] // Array to store bookmarked recipes
}

// Function to load a recipe by its ID
export const loadRecipe = async function (id) {
    try {
        // Fetch recipe data from the API using the provided ID
        const data = await getJSON(`${APP_URL}${id}`);

        // Destructure the recipe data from the API response
        const { recipe } = data.data;

        // Format and store the relevant recipe information in the state
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceURL: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };

        // Check if the recipe is already bookmarked and set the bookmarked status
        state.recipe.bookmarked = state.bookmark.some(bookmark => bookmark.id === id);
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
        state.search.results = data.data.recipes.map(rec => ({
            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url
        }));

        // Reset the current page number to the first page
        state.search.currentPageNumber = 1;
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

    // Return the sliced array of results for the current page
    return state.search.results.slice(start, end);
}

// Function to update ingredient quantities when servings are updated
export const updateServings = function (newServings) {
    // Update each ingredient's quantity proportionally to the new servings
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    // Update the servings in the state
    state.recipe.servings = newServings;
}

// Function to add a recipe to the bookmarks
export const addBookmark = function (recipe) {
    // Add the recipe to the bookmarks array
    state.bookmark.push(recipe);

    // Mark the current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

// Function to delete a recipe from the bookmarks
export const deleteBookmark = function (id) {
    // Find the index of the recipe with the given ID in the bookmarks array
    const index = state.bookmark.findIndex(el => el.id === id);

    // Remove the recipe from the bookmarks array
    state.bookmark.splice(index, 1);

    // Update the bookmarked status of the current recipe if applicable
    if (id === state.recipe.id) state.recipe.bookmarked = false;
}
