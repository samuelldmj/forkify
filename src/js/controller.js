// https://forkify-api.herokuapp.com/v2


//polyfilling
import 'core-js';

//importing model
import * as model from './model.js';

//import views  class
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';

if(module.hot){
  module.hot.accept();
}


function main() {
  // console.log("Main function executed from controller.");
  //application logic

//rendering spinner
// recipeView.spinnerLoader();


const controlRecipe = async function () {
  try {
    //extracting the hash or id from the url
    const id = window.location.hash.slice(1);
    // console.log(id);

    //when hash or id is not present
    if(!id) return;

    //rendering spinner loader
    recipeView.spinnerLoader();

   //1) loading api 
   await model.loadRecipe(id);

    //2) rendering api call
   recipeView.render(model.state.recipe);
   console.log(model.state.recipe);

    
  } catch (err) {
    recipeView.renderError();
  }
}

// controlRecipe();
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

const controlSearchResult = async function(){
  try {

    //render spinner
    resultsView.spinnerLoader();
    console.log(resultsView);
    
    const query = searchView.getQuery();
    if(!query) return;

    //load search result
   await model.loadSearchResult(query);
   

   //render search result
   resultsView.render(model.state.search.results);
   console.log(model.state.search.results);

  } catch (err) {
    console.error(err);
  }
}

//event initializer
const init = function(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult)
}
init();



}

// Export the main function or whatever you want to be accessible from outside
module.exports = { main };