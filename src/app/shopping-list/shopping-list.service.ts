import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Flour', 1),
    new Ingredient('cheese', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addNewIngredients(ings: Ingredient[]) {
    // for (var item of ingredients) {
    //   this.addNewIngredient(item);
    // }
    this.ingredients.push(...ings);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
