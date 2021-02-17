import { Injectable } from '@angular/core';
import { IngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/ingredientFullObject';
import { MealandRecipe } from 'src/app/models/fortheKitchen/fullObjects/mealandRecipe';
import { MealFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealFullObject';
import { MealsandIngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealsandIngredientFullObject';
import { Ingredient_genre } from 'src/app/models/fortheKitchen/ingredient_genre';
import { InputJustifierService } from '../inputs/input-justifier.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectsandObjectListsService {
  mealFullObjfortheRegistration:MealFullObject
  mealFullRealList:MealFullObject[]=[]
  mealFullDisplayList:MealFullObject[]=[]
  
  mealsandIngredientFullObj:MealsandIngredientFullObject
  mealsandIngredientFullObjRealList:MealsandIngredientFullObject[]=[]
  mealsandIngredientFullObjDisplayList:MealsandIngredientFullObject[]=[]

  mealsandRecipesFullObj:MealandRecipe
  mealsandRecipesFullObjRealList:MealandRecipe[]=[]
  mealsandRecipesFullObjDisplayList:MealandRecipe[]=[]

  RecipesFullObj:MealandRecipe
  RecipesFullObjRealList:MealandRecipe[]=[]
  RecipesFullObjDisplayList:MealandRecipe[]=[]

  IngredientFULLObj:IngredientFullObject
  IngredientFULLObjRealList:IngredientFullObject[]=[]
  IngredientFULLObjDisplayList:IngredientFullObject[]=[]

  IngredientGenreObj:Ingredient_genre
  IngredientGenreObjRealList:Ingredient_genre[]=[]
  IngredientGenreObjDisplayList:Ingredient_genre[]=[]


  constructor(
    private inputJustifierService:InputJustifierService
  ) { }


  Ingredient(){
    this.IngredientFULLObjRealList=this.inputJustifierService.gettheList('provideIngredientFullInfos')
  }
  
  IngredientGenre(){
    this.IngredientGenreObjRealList=this.inputJustifierService.gettheList('Ingredient_genreList')
  }

  MealandRecipe(){
    this.mealsandRecipesFullObjRealList=this.inputJustifierService.gettheList('MealandRecipeFullList')
  }

  RecipeFull(){
    this.RecipesFullObjRealList=this.inputJustifierService.gettheList('RecipeFullList')
  }
}
