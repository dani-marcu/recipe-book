import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangedSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.idChangedSub = this.slService.ingerdientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }


  ngOnDestroy() {
    this.idChangedSub.unsubscribe();
  }

}
