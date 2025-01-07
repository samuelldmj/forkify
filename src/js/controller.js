// https://forkify-api.herokuapp.com/v2


// Polyfill for modern JavaScript features in older environments
import 'core-js';

// Importing the model which contains the application's data and logic
import * as model from './model.js';

// Importing view classes for rendering different parts of the application
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

// This helps keep the state of the page if any changes are made in the file.
// Uncomment the following lines if using hot module replacement during development.
// if(module.hot){
//   module.hot.accept();
// }

// Main function to control the application logic
function main() {
  // console.log("Main function executed from controller.");
  
  // Function to control the recipe loading and rendering
  const controlRecipe = async function () {
    try {
      // Extracting the hash or ID from the URL (e.g., #123)
      const id = window.location.hash.slice(1);
      // console.log(id);

      // If no ID is present, exit the function
      if (!id) return;

      // Render the spinner loader while fetching data
      recipeView.spinnerLoader();

      // 0)
      resultsView.updateRender(model.getSearchResultPage());

      // 1) Load the recipe data from the API using the extracted ID
      await model.loadRecipe(id);

      // 2) Render the loaded recipe data
      recipeView.render(model.state.recipe);
      console.log(model.state.recipe);

    } catch (err) {
      // Render an error message if the API call fails
      recipeView.renderError();
    }
  }

  // Function to control the search results loading and rendering
  const controlSearchResult = async function() {
    try {
      // Render the spinner loader while fetching search results
      resultsView.spinnerLoader();
      // console.log(resultsView);
      
      // Get the search query from the search view
      const query = searchView.getQuery();
      // If no query is present, exit the function
      if (!query) return;

      // Load search results from the API based on the query
      await model.loadSearchResult(query);
      
      // Render the search results for the current page
      resultsView.render(model.getSearchResultPage());
      // console.log(model.state.search.results);
      console.log(model.state.search.results);

      // Render pagination controls based on the search results
      paginationView.render(model.state.search);

    } catch (err) {
      // Log any errors that occur during the search process
      console.error(err);
    }
  }

  // Function to control pagination
  const controlPagination = function(goToPage) {

    //render new result.
    resultsView.render(model.getSearchResultPage(goToPage));
    console.log(model.state.search.results);

    // Render new pagination  button clicked.
    paginationView.render(model.state.search);
  }


  const controlServings = function(newServings){
    //update recipe servings in state.
    model.updateServings(newServings);

    //update recipe views
    // recipeView.render(model.state.recipe);
    recipeView.updateRender(model.state.recipe);

  }

  // Event initializer to set up event handlers
  const init = function() {
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResult);
    paginationView.addClickHandler(controlPagination);
    recipeView.addHandlerUpdateServings(controlServings);
  }

  // Initialize the event handlers
  init();
}

// Export the main function or any other desired functionality for external access
module.exports = { main };
