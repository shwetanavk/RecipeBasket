import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetail.ingredients
    );
    // alert('added to shopping list');
    // var n = this.recipeDetail.ingredients.length;

    // for (let i = 0; i < n; i++) {
    //   var newIngredient = this.recipeDetail.ingredients[i];
    //   this.shoppingListService.addNewIngredient(newIngredient);
    // }
  }
}
