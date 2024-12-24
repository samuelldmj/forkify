
//polyfilling
import 'core-js';

//importing model
import * as model from './model.js';

//import views  class
import recipeView from './view/recipeView.js';


function main() {
  console.log("Main function executed from controller.");
  //application logic

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//rendering spinner
recipeView.spinnerLoader();


const controlRecipe = async function () {
  try {
    //extracting the hash or id from the url
    const id = window.location.hash.slice(1);
    console.log(id);

    //when hash or id is not present
    if(!id) return;

    //rendering spinner loader
    recipeView.spinnerLoader(recipeContainer);

   //1) loading api 
   await model.loadRecipe(id);

    //2) rendering api call
   recipeView.render(model.state.recipe);

    
  } catch (err) {
    alert(err);
  }
}

// controlRecipe();
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
}

// Export the main function or whatever you want to be accessible from outside
module.exports = { main };