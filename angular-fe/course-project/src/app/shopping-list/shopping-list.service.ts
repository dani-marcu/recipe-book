import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  ingerdientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingerdientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingerdientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingerdientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingerdientsChanged.next(this.ingredients.slice());
  }
}
