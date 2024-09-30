import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'French Omelette',
  //     'Recipe for a french omelette',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-328624_11-eca84b2.jpg',
  //     [new Ingredient('Egg', 1), new Ingredient('Butter', 1)]
  //   ),
  //   new Recipe(
  //     'Grilled Fish',
  //     'Recipe for a grilled gish',
  //     'https://i.pinimg.com/474x/78/50/f6/7850f6350930746ceb28ec14f8aa5429.jpg',
  //     [new Ingredient('Fish', 1), new Ingredient('Onions', 2)]
  //   ),
  //   new Recipe(
  //     'Momos',
  //     'Recipe for a Momos',
  //     'https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg',
  //     [new Ingredient('Flour', 1), new Ingredient('Cabbage', 1)]
  //   ),
  //   new Recipe(
  //     'Aloo Dum',
  //     'Recipe for a Aloo Dum',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2012/04/kashmiri-dum-aloo-recipe-11a.jpg',
  //     [new Ingredient('Potato', 2), new Ingredient('Onions', 1)]
  //   ),
  // ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addNewIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
