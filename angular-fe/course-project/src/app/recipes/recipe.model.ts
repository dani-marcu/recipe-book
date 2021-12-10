import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public image: string;
  public ingredients: Ingredient[];
  public _id: string;

  constructor(
    name: string,
    desc: string,
    image: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.image = image;
    this.ingredients = ingredients;
  }
}
