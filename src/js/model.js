//polyfilling async await
import 'regenerator-runtime/runtime';


import { APP_URL } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    },
}

// console.log('state.search.results = ',state.search.results);

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
        // console.log("state = ",state.recipe);
        // console.log("data = ", data);
    } catch (err) {
        throw err;
    }
}


export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${APP_URL}?search=${query}`);
        // console.log('search =', data);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })
    } catch (err) {
        throw err;
    }
}