import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/ingredientFullObject';
import { MealsandIngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealsandIngredientFullObject';
import { MealsandIngredient } from 'src/app/models/fortheKitchen/mealsandIngredient';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { ObjectsandObjectListsService } from 'src/app/services/objectsandObjectLists/objectsand-object-lists.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-mealand-ingredient-update',
  templateUrl: './mealand-ingredient-update.component.html',
  styleUrls: ['./mealand-ingredient-update.component.css']
})
export class MealandIngredientUpdateComponent implements OnInit {
  name:string
  surname:string

  ingredientHasBeenAdded:boolean
  ingredientHasBeenDeleted:boolean

  amount:number

  mealsandIngredientFullObjforAdd:MealsandIngredientFullObject
  mealsandIngredientFullObjforUpdate:MealsandIngredientFullObject
  mealsandIngredientFullObjRealList:MealsandIngredientFullObject[]=[]
  mealsandIngredientFullObjDisplayList:MealsandIngredientFullObject[]=[]
  /////////////////////////////////////////////
  mealsandIngredientObjtoDelete:MealsandIngredientFullObject
  mealsandIngredientObjtoAdd:MealsandIngredientFullObject
  mealsandIngredientObjtoUpdate:MealsandIngredientFullObject
  /////////////////////////////////////////////
  mealsandIngredientListtoDelete:MealsandIngredientFullObject[]=[]
  mealsandIngredientListtoAdd:MealsandIngredientFullObject[]=[]
  mealsandIngredientListtoUpdate:MealsandIngredientFullObject[]=[]

  MealsandIngredientObj:MealsandIngredient
  MealsandIngredientObjtoDelete:MealsandIngredient
  MealsandIngredientListtoAdd:MealsandIngredient[]=[]
  MealsandIngredientListtoDelete:MealsandIngredient[]=[]

  IngredientFULLObj:IngredientFullObject
  IngredientFULLObjRealList:IngredientFullObject[]=[]
  IngredientFULLObjDisplayList:IngredientFullObject[]=[]


  constructor(@Inject('chef') private chef, 
    private objectConstructor:ObjectConstructorService, 
    private router:RoutesService, 
    private userService:UsersService, 
    private inputJustifierService:InputJustifierService,
    private objectsandObjectListsService:ObjectsandObjectListsService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.objectsandObjectListsService.Ingredient()
    this.objectsandObjectListsService.IngredientGenre()

    this.gettheLists('MealandIngredientFullList')

    this.ingredientHasBeenAdded=false
    this.ingredientHasBeenDeleted=false
  }


  gettheLists(path1){
    this.mealsandIngredientFullObjRealList=this.inputJustifierService.gettheList(path1)
    this.mealsandIngredientFullObjDisplayList=this.objectsandObjectListsService.mealsandIngredientFullObjDisplayList

    this.IngredientFULLObjRealList=this.objectsandObjectListsService.IngredientFULLObjRealList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname
  }


  delete(obj){
    for (var i = 0; i < this.mealsandIngredientFullObjDisplayList.length; i++) {
      if(this.mealsandIngredientFullObjDisplayList[i].Id==obj.Id ){
        //delete listesine alınacak
        this.mealsandIngredientListtoDelete.push(this.mealsandIngredientFullObjDisplayList[i])

        this.MealsandIngredientObjtoDelete={"Id":this.mealsandIngredientFullObjDisplayList[i].Id,
          "meal_id":this.mealsandIngredientFullObjDisplayList[i].meal_id,
          "ingredient_id":this.mealsandIngredientFullObjDisplayList[i].ingredient_id,
          "amount":this.mealsandIngredientFullObjDisplayList[i].amount}

        this.MealsandIngredientListtoDelete.push(this.MealsandIngredientObjtoDelete)

        this.mealsandIngredientFullObjDisplayList.splice(i,1);
        i--;
      }
    }

    this.ingredientHasBeenDeleted=true
  }

  //inputları girince
  settheAddObj(ingredientValue,amount){
    this.IngredientFULLObjRealList.forEach(element => {
      if(element.Id==ingredientValue){
        this.IngredientFULLObj=element
      }
    });

    this.amount=amount
  }
  //onaya basınca
  add(){
    this.mealsandIngredientFullObjforAdd={"Id":0,"meal_id":this.objectsandObjectListsService.mealFullObjfortheRegistration.Id,
                                    "meal_name":this.objectsandObjectListsService.mealFullObjfortheRegistration.name,
                                    "ingredient_id":this.IngredientFULLObj.Id,"ingredient_name":this.IngredientFULLObj.name,
                                    "amount":this.amount}
     
    this.mealsandIngredientFullObjDisplayList.push(this.mealsandIngredientFullObjforAdd)

    this.MealsandIngredientObj={"Id":0,
                                "meal_id":this.objectsandObjectListsService.mealFullObjfortheRegistration.Id,
                                "ingredient_id":this.IngredientFULLObj.Id,
                                "amount":this.amount}

    this.MealsandIngredientListtoAdd.push(this.MealsandIngredientObj) 
    
    this.ingredientHasBeenAdded=true
  }

  submit(){
    if(confirm("Seçmiş olduğunuz yemeğin malzemeleri ile ilgili yapmış olduğunuz değişikleri kaydetmek istiyor musunuz?")) {
      if(this.ingredientHasBeenAdded){
        this.inputJustifierService.InputCheck("addSomeIngredientstoMealandIngredient",null,"add",this.MealsandIngredientListtoAdd).subscribe(
          data=>{
            console.log(data)
          }
        )
      }
      if(this.ingredientHasBeenDeleted){
        this.inputJustifierService.InputCheck("deleteSomeIngredientstoMealandIngredient",null,"add",this.MealsandIngredientListtoDelete).subscribe(
          data=>{
            console.log(data)
          }
        )
      }
      if(!this.ingredientHasBeenAdded && !this.ingredientHasBeenDeleted){
        alert("Herhangi bir değişilik yapılmadı.")
      }
      else{
        alert("succesful!")
      }
  
      this.inputJustifierService.closetheDialogs()
    }
  }
}
