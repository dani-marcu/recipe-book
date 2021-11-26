import {Recipe} from "./recipe.model";
import {Injectable, Injector} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable()
export class RecipeService{
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  errorMessage = new Subject<string>();

  constructor(private slService: ShoppingListService,private http: HttpClient) {

  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.http.post<string>('http://localhost:3000/api/recipes',recipe).subscribe(response => {
      const obj = JSON.parse(response);
      if(obj.OK){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        this.errorMessage.next('');
      } else {
        if (!obj.error){
          this.errorMessage.next('Unknown error.')
        } else {
          this.errorMessage.next(obj.error);
        }
      }
    });
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.http.put<string>('http://localhost:3000/api/recipes/'+ index,newRecipe).subscribe(response => {
      const obj = JSON.parse(response);
      if(obj.OK){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
        this.errorMessage.next('');
      } else {
        if (!obj.error){
          this.errorMessage.next('Unknown error.')
        } else {
          this.errorMessage.next(obj.error);
        }
      }
    });
  }

  deleteRecipe(index: number){
    this.http.delete<string>('http://localhost:3000/api/recipes/'+ index).subscribe(response => {
      const obj = JSON.parse(response);
      if(obj.OK){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
        this.errorMessage.next('');
      } else {
        if (!obj.error){
          this.errorMessage.next('Unknown error.')
        } else {
          this.errorMessage.next(obj.error);
        }
      }
    });
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('http://localhost:3000/api/recipes').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes =>{
        this.setRecipes(recipes);
      })
    )
  }
}
