import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Flour', 1),
    new Ingredient('cheese', 2),
  ];
  constructor() {}

  ngOnInit(): void {}

  addNewIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
  }
}
