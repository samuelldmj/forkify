//polyfilling async await
import 'regenerator-runtime';

export const state = {
    recipe : {},
}

export const loadRecipe = async function (id) {

    try {

 
     //loading api 
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} ${data.status}`);
    
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
        console.log(state.recipe);
        //testing the api calls
        console.log("res =",res);
        console.log("data = ", data);
    } catch(err){
        alert(err);
    }
}