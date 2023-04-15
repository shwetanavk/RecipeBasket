import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'French Omelette',
      'Recipe for a french omelette',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-328624_11-eca84b2.jpg',
      [new Ingredient('Egg', 1), new Ingredient('butter', 1)]
    ),
    new Recipe(
      'Grilled Fish',
      'Recipe for a grilled gish',
      'https://i.pinimg.com/474x/78/50/f6/7850f6350930746ceb28ec14f8aa5429.jpg',
      [new Ingredient('Fish', 1), new Ingredient('onions', 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addNewIngredients(ingredients);
  }
}
