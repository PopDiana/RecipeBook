import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient-model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],

})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f', {static: true}) slForm: NgForm; 
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData =>{
        if (stateData.editedIngredientIndex > -1){
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }else{
          this.editMode = false;
        }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } 
    
    form.reset();  
  }

  onClear(){
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;

  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
