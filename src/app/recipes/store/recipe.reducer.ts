import { Recipe } from '../recipe.model';
import { Action } from '@ngrx/store';
import * as RecipesActions from './recipe.actions';
import { STATE_PROVIDERS } from '@ngrx/store/src/state';

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: []
}
export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions){

    switch(action.type){
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = {...state.recipes[action.payload.index], 
                ...action.payload.newRecipe
            };
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] =  updatedRecipe;
            return {
                ...state,
                recipes: updatedRecipes
            };
        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            };

        default:
            return state;

    }
   
    
}