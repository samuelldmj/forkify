
import icons from '../img/icons.svg';
//polyfilling
import 'core-js';
//polyfilling async await
import 'regenerator-runtime';
// console.log(icons)

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
const spinnerLoader = function(parentEl){
  const markup = `
     <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  
  `
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin' , markup);
}


const showRecipe = async function () {
  try {
    //extracting the hash or id from the url
    const id = window.location.hash.slice(1);
    console.log(id);

    //when hash or id is not present
    if(!id) return;

    //rendering spinner loader
    spinnerLoader(recipeContainer);

    //loading api 
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${data.status}`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }

    //rendering api call
    const injecting_api_into_html = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ing => {

            return `

            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
      `
      }).join('')}
        
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg> 
          </a>
        </div>

    `
    recipeContainer.textContent = '';
    recipeContainer.insertAdjacentHTML('afterbegin', injecting_api_into_html);

    //testing the api calls
    console.log("res =",res);
    console.log("data = ", data);
  } catch (err) {
    alert(err);
  }
}

// showRecipe();
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);
}

// Export the main function or whatever you want to be accessible from outside
module.exports = { main };