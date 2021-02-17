import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealsandIngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealsandIngredientFullObject';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ObjectsandObjectListsService } from 'src/app/services/objectsandObjectLists/objectsand-object-lists.service';

@Component({
  selector: 'app-mealand-ingredient-see',
  templateUrl: './mealand-ingredient-see.component.html',
  styleUrls: ['./mealand-ingredient-see.component.css']
})
export class MealandIngredientSeeComponent implements OnInit {
  name:string
  surname:string

  mealsandIngredientFullObj:MealsandIngredientFullObject
  mealsandIngredientFullObjRealList:MealsandIngredientFullObject[]=[]
  mealsandIngredientFullObjDisplayList:MealsandIngredientFullObject[]=[]

  constructor(@Inject('chef') private chef, 
    private objectConstructor:ObjectConstructorService, 
    private router:RoutesService, 
    private userService:UsersService, 
    private inputJustifierService:InputJustifierService,
    private objectsandObjectListsService:ObjectsandObjectListsService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('MealandIngredientFullList')
  }


  gettheLists(path1){
    this.mealsandIngredientFullObjRealList=this.inputJustifierService.gettheList(path1)
    this.mealsandIngredientFullObjDisplayList=this.objectsandObjectListsService.mealsandIngredientFullObjDisplayList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname
  }
}
