import { Recipe } from './recipe.model';
import { Injectable, Injector } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  recipes = new BehaviorSubject<Recipe[]>([]);
  errorMessage = new Subject<string>();

  constructor(
    private slService: ShoppingListService,
    private http: HttpClient
  ) {}

  getRecipes() {
    return this.recipes.value;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes.value[index];
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<Recipe>('http://localhost:3005/api/recipes', recipe)
      .pipe(
        tap((savedRecipe) => {
          const currentValue = this.recipes.value;
          const updatedValue = [...currentValue, savedRecipe];
          this.recipes.next(updatedValue);
        }),
        catchError((error) => {
          this.errorMessage.next(error.error);
          throw error;
        })
      );
  }

  updateRecipe(index: number, id: string, newRecipe: Recipe) {
    return this.http
      .put<Recipe>(`http://localhost:3005/api/recipes/${id}`, newRecipe)
      .pipe(
        tap(() => {
          const updatedValue = this.recipes.value;
          updatedValue[index] = newRecipe;
          this.recipes.next(updatedValue);
        }),
        catchError((error) => {
          this.errorMessage.next(error.error);
          throw error;
        })
      );
  }

  deleteRecipe(index: number, id: string): Observable<Recipe> {
    return this.http
      .delete<Recipe>(`http://localhost:3005/api/recipes/${id}`)
      .pipe(
        tap(() => {
          const updateValue = this.recipes.value;
          updateValue.splice(index, 1);
          this.recipes.next(updateValue);
        }),
        catchError((error) => {
          this.errorMessage.next(error.error);
          throw error;
        })
      );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes.next(recipes);
  }

  fetchRecipes(options = null) {
    let url = 'http://localhost:3005/api/recipes';
    if (options?.search) {
      url += `?search=${encodeURI(options.search)}`;
      if (options?.range) {
        url += `&minIngredients=${encodeURI(
          options.range[0]
        )}&maxIngredients=${encodeURI(options.range[1])}`;
      }
    } else if (options?.range) {
      url += `?minIngredients=${encodeURI(
        options.range[0]
      )}&maxIngredients=${encodeURI(options.range[1])}`;
    }
    return this.http.get<Recipe[]>(url).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.setRecipes(recipes);
      })
    );
  }
}
