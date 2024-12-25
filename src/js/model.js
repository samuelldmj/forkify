//polyfilling async await
import  'regenerator-runtime';
import { APP_URL } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe : {},
}

export const loadRecipe = async function (id) {

    try {

 
     //loading api 
        const data = await getJSON(`${APP_URL}/${id}`);
    
        const { recipe } = data.data;
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
        console.log("state = ",state.recipe);
        console.log("data = ", data);
    } catch(err){
        console.error(err, "From model file");
    }
}