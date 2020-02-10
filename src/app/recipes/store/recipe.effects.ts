import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Injectable()
export class RecipeEffects{

    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
        return this.http.get<Recipe[]>('https://ng-recipe-book-87494.firebaseio.com/recipes.json')
    })
    ,map(recipes => {
        return recipes.map(recipe => {
            return {
                ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
            }
        });
    })
    ,map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
            
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')), 
    switchMap(([actionData, recipesState]) => {   // array destructuring
        return this.http.put(
            'https://ng-recipe-book-87494.firebaseio.com/recipes.json', recipesState.recipes);
    })
    );

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

}