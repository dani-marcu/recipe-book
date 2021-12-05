import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDeleteRecipe(){
    try{
      const recipe = this.recipeService.getRecipe(this.id);
      this.recipeService.deleteRecipe(recipe._id).subscribe(() => {
        const updateValue = this.recipeService.recipes.value;
        updateValue.splice(this.id,1);
        this.recipeService.recipes.next(updateValue);
      }, (error) => {
        this.recipeService.errorMessage.next(error.error);
      })
    } catch (error) {
      this.recipeService.errorMessage.next('Unknown error');
    }
    this.router.navigate(['/'])
  }

}
