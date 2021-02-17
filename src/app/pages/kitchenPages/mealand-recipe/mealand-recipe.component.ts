import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealandRecipe } from 'src/app/models/fortheKitchen/fullObjects/mealandRecipe';
import { MealFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealFullObject';
import { Meal } from 'src/app/models/fortheKitchen/meal';
import { MealVariation } from 'src/app/models/fortheKitchen/mealVariation';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { ObjectsandObjectListsService } from 'src/app/services/objectsandObjectLists/objectsand-object-lists.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-mealand-recipe',
  templateUrl: './mealand-recipe.component.html',
  styleUrls: ['./mealand-recipe.component.css']
})
export class MealandRecipeComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  mealNameList:string[]=[]

  mealID:number

  mealVariationObjfortheRegistration:MealVariation
  mealVariationRealList:MealVariation[]=[]
  mealVariationDisplayList:MealVariation[]=[]

  mealObjfortheRegistration:Meal
  mealRealList:Meal[]=[]
  mealDisplayList:Meal[]=[]

  mealFullObjfortheRegistration:MealFullObject
  mealFullRealList:MealFullObject[]=[]
  mealFullDisplayList:MealFullObject[]=[]

  mealsandRecipesFullObj:MealandRecipe
  mealsandRecipesFullObjRealList:MealandRecipe[]=[]
  mealsandRecipesFullObjDisplayList:MealandRecipe[]=[]

  RecipesFullObj:MealandRecipe
  RecipesFullObjRealList:MealandRecipe[]=[]
  RecipesFullObjDisplayList:MealandRecipe[]=[]


  constructor(@Inject('chef') private chef, 
              private objectConstructor:ObjectConstructorService, 
              private objectConstructorList:ObjectsandObjectListsService,
              private router:RoutesService, 
              private userService:UsersService, 
              private inputJustifierService:InputJustifierService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('MealFullList','MealVariationList','mealNameList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  
  // opentheAddPopUp(){
  //   const dialogRef = this.dialog.open(MealAddPopUpComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.updatetheLists()
  //   });
  // }

  // opentheUpdatePopUp(){
  //   const dialogRef = this.dialog.open(MealUpdatePopUpComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.updatetheLists()
  //   });
  // }
  
  gettheLists(path1,path2,path3){
    this.mealFullRealList=this.inputJustifierService.gettheList(path1)
    this.mealFullDisplayList=this.mealFullRealList

    this.mealVariationRealList=this.inputJustifierService.gettheList(path2)
    this.mealVariationDisplayList=this.mealVariationRealList

    this.router.gettheListRoute(this.chef+'/'+path3,this.userService.tokenProvider()).subscribe(data=>{
      data.forEach(element => {
        this.mealNameList.push(element)
      });
    })
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.mealFullObjfortheRegistration={"Id":0,"name":"","meal_variation_id":0,"meal_variation_name":""}

    this.objectConstructorList.MealandRecipe()
    this.mealsandRecipesFullObjRealList=this.objectConstructorList.mealsandRecipesFullObjRealList
    this.mealsandRecipesFullObjDisplayList=this.mealsandRecipesFullObjRealList

    this.objectConstructorList.RecipeFull()
    this.RecipesFullObjRealList=this.objectConstructorList.RecipesFullObjRealList
    this.RecipesFullObjDisplayList=this.RecipesFullObjRealList
  }

  updatetheLists(){
    this.mealFullRealList=this.inputJustifierService.gettheList("MealFullList")
    this.mealFullDisplayList=this.mealFullRealList

    this.mealVariationRealList=this.inputJustifierService.gettheList("MealVariationList")
    this.mealVariationDisplayList=this.mealVariationRealList
  }
}
