import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (!this.editMode)
      this.shoppingListService.addNewIngredient(newIngredient);
    else {
      this.shoppingListService.updateIngredient(
        newIngredient,
        this.editedItemIndex
      );
    }

    this.onClearItem();
  }

  onClearItem() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
    this.onClearItem();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
