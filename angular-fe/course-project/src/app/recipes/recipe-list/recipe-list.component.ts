import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  errorMessage: string = '';
  recipesSubscription: Subscription;
  errorMessageSubscription: Subscription;
  searchForm: FormGroup;
  sliderForm: FormGroup;
  value: number = 0;
  highValue: number = 10;
  options: Options = {
    floor: 0,
    ceil: 10
  };

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.recipes.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    this.errorMessageSubscription = this.recipeService.errorMessage.subscribe(
      (error: string) => {
        this.errorMessage = error;
      }
    );
    this.initForm();
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  private initForm(){
    let searchInput = '';
    this.searchForm = new FormGroup({
      'search_field': new FormControl(searchInput)
    })
    this.sliderForm = new FormGroup({
      'slider': new FormControl([0,10])
    })
  }

  onSearch(){
    const options = {
      search : this.searchForm.value['search_field']
    }
    this.recipeService.fetchRecipes(options).subscribe();
  }

  onSliderSubmit(){
    const options = {
      range : this.sliderForm.value['slider']
    }
    this.recipeService.fetchRecipes(options).subscribe();
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

}
