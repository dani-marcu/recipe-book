import {Recipe} from "./recipe.model";
import {Injectable, Injector} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {BehaviorSubject, catchError, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable()
export class RecipeService {
  recipes = new BehaviorSubject<Recipe[]>([]);
  errorMessage = new Subject<string>();

  constructor(private slService: ShoppingListService, private http: HttpClient) {
  }

  getRecipes() {
    return this.recipes.value;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.value[index];
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<string>('http://localhost:3005/api/recipes', recipe);
  }

  updateRecipe(index: string, newRecipe: Recipe) {
    return this.http.put('http://localhost:3005/api/recipes/' + index, newRecipe);
  }

  deleteRecipe(index: string) {
    return this.http.delete<string>('http://localhost:3005/api/recipes/' + index);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes.next(recipes);
  }

  fetchRecipes(options) {
    let url = 'http://localhost:3005/api/recipes';
    if (options){
      if(options.search){
        url += '?search=' + encodeURI(options.search);
      }
      if(options.range){
        url += '?min=' + encodeURI(options.range[0]) + '&max=' + encodeURI(options.range[1]);
      }
    }
    return this.http.get<Recipe[]>(url).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.setRecipes(recipes);
      })
    )
  }

}
