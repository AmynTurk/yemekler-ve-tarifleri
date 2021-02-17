import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/ingredientFullObject';
import { MealFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealFullObject';
import { MealsandIngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealsandIngredientFullObject';
import { Meal } from 'src/app/models/fortheKitchen/meal';
import { MealVariation } from 'src/app/models/fortheKitchen/mealVariation';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { ObjectsandObjectListsService } from 'src/app/services/objectsandObjectLists/objectsand-object-lists.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { MealandIngredientSeeComponent } from './mealand-ingredient-see/mealand-ingredient-see.component';
import { MealandIngredientUpdateComponent } from './mealand-ingredient-update/mealand-ingredient-update.component';

@Component({
  selector: 'app-mealand-ingredient',
  templateUrl: './mealand-ingredient.component.html',
  styleUrls: ['./mealand-ingredient.component.css']
})
export class MealandIngredientComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  mealNameList:string[]=[]

  mealID:number

  mealVariationObjfortheRegistration:MealVariation
  mealVariationRealList:MealVariation[]=[]
  mealVariationDisplayList:MealVariation[]=[]
  
  mealsandIngredientFullObj:MealsandIngredientFullObject
  mealsandIngredientFullObjRealList:MealsandIngredientFullObject[]=[]
  mealsandIngredientFullObjDisplayList:MealsandIngredientFullObject[]=[]

  IngredientFullInfoforRegistration:IngredientFullObject
  IngredientFullInfoRealList:IngredientFullObject[]=[]
  IngredientFullInfoDisplayList:IngredientFullObject[]=[]

  mealObjfortheRegistration:Meal
  mealRealList:Meal[]=[]
  mealDisplayList:Meal[]=[]

  mealFullObjfortheRegistration:MealFullObject
  mealFullRealList:MealFullObject[]=[]
  mealFullDisplayList:MealFullObject[]=[]


  constructor(@Inject('chef') private chef, 
              private objectConstructor:ObjectConstructorService, 
              private router:RoutesService, 
              private userService:UsersService, 
              private inputJustifierService:InputJustifierService,
              private objectsandObjectListsService:ObjectsandObjectListsService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('MealFullList','MealandIngredientFullList','MealVariationList','mealNameList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  
  opentheSeePopUp(){
    const dialogRef = this.dialog.open(MealandIngredientSeeComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  see(obj){
    this.updateChoose(obj)

    this.opentheSeePopUp()
  }

  opentheUpdatePopUp(){
    const dialogRef = this.dialog.open(MealandIngredientUpdateComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  update(obj){
    this.updateChoose(obj)

    this.opentheUpdatePopUp()
  }
  
  gettheLists(path1,path2,path3,path4){
    this.mealFullRealList=this.inputJustifierService.gettheList(path1)
    this.mealFullDisplayList=this.mealFullRealList

    this.mealsandIngredientFullObjRealList=this.inputJustifierService.gettheList(path2)
    this.mealsandIngredientFullObjDisplayList=this.mealsandIngredientFullObjRealList

    this.mealVariationRealList=this.inputJustifierService.gettheList(path3)
    this.mealVariationDisplayList=this.mealVariationRealList

    this.router.gettheListRoute(this.chef+'/'+path4,this.userService.tokenProvider()).subscribe(data=>{
      data.forEach(element => {
        this.mealNameList.push(element)
      });
    })
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.mealFullObjfortheRegistration={"Id":0,"name":"","meal_variation_id":0,"meal_variation_name":""}
  }

  storetheFilter(mealName,mealVariation){
    localStorage.setItem("mealFilter", mealName)

    localStorage.setItem("mealVariationFilter", mealVariation)
  }

  cleartheDisplayListwithMealVariation(value){
    if(value!="0" && value!=0){
      for (var i = 0; i < this.mealFullDisplayList.length; i++) {
        if(this.mealFullDisplayList[i].meal_variation_id!=value ){
          this.mealFullDisplayList.splice(i,1);
          i--;
        }
      }
    }
  }

  cleartheDisplayListwithMealName(value){
    if(value!="0" && value!=0){
      for (var i = 0; i < this.mealFullDisplayList.length; i++) {
        if(this.mealFullDisplayList[i].name!=value ){
          this.mealFullDisplayList.splice(i,1);
          i--;
        }
      }
    }
  }

  cleartheDisplayList(mealName,mealVariation){
    this.mealFullDisplayList=[]

    this.mealFullRealList.forEach(element => {
      this.mealFullDisplayList.push(element)
    });

    this.cleartheDisplayListwithMealVariation(mealVariation)

    this.cleartheDisplayListwithMealName(mealName)

    this.storetheFilter(mealName,mealVariation)
  }

  doesInputsEmpty(name){
    if(name==""){
      return true
    }
    else{
      return false
    }
  }
  //           ||           //              
  //           ||           //
  doestheNameSuitable(name){
    var result=true

    this.mealRealList.forEach(element => {
      if(name==element.name){
        alert("the name you have entered is already in used for the choosen ingredient genre. Please type different one.")
        
        result=false
      }
    });

    return result
  }
  //           ||           //              
  //           ||           //
  updatetheLists(){
    this.mealFullRealList=this.inputJustifierService.gettheList("MealFullList")
    this.mealFullDisplayList=this.mealFullRealList

    this.mealsandIngredientFullObjRealList=this.inputJustifierService.gettheList("MealandIngredientFullList")
    this.mealsandIngredientFullObjDisplayList=this.mealsandIngredientFullObjRealList

    
  }
  //           ||           //              
  //           \/           //
  nameInputCheckforRegistration(name){
    var result=this.inputJustifierService.textInputJustifier(name,'name')

    var result2=false
    
    if(result=="2"){
      if(this.doesInputsEmpty(name)==false){
        if(this.doestheNameSuitable(name)==true){
          ////kayıt
          this.mealFullObjfortheRegistration={"Id":0,"name":"","meal_variation_id":0,"meal_variation_name":""}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  add(ingredientName){
    if(this.nameInputCheckforRegistration(ingredientName)==true){
      this.inputJustifierService.InputCheck("addMeal",null,"add",this.mealObjfortheRegistration).subscribe(data=>{
        alert(data)
      })
    }

    alert("succesful!")

    this.updatetheLists()
  }

  updateChoose(obj){
    this.inputJustifierService.storageDataList=[]

    this.mealFullObjfortheRegistration=JSON.parse(JSON.stringify(obj))
    
    this.objectsandObjectListsService.mealFullObjfortheRegistration=this.mealFullObjfortheRegistration

    this.inputJustifierService.storageDataList.push(this.mealFullObjfortheRegistration.Id.toString())
    this.inputJustifierService.storageDataList.push(this.mealFullObjfortheRegistration.name)
    this.inputJustifierService.storageDataList.push(this.mealFullObjfortheRegistration.meal_variation_id.toString())
    this.inputJustifierService.storageDataList.push(this.mealFullObjfortheRegistration.meal_variation_name)

    this.objectsandObjectListsService.mealsandIngredientFullObjDisplayList=this.inputJustifierService.filter(this.mealsandIngredientFullObjRealList,"meal_id",this.mealFullObjfortheRegistration.Id.toString())

    this.mealID=this.mealFullObjfortheRegistration.Id

    // this.inputJustifierService.storageDataList[0]=this.mealObjfortheRegistration.name
    this.inputJustifierService.sendObjecttoLocalStore(this.mealFullObjfortheRegistration,"mealObjValue")

    this.inputJustifierService.storageData=this.inputJustifierService.usetheLocalStorage("mealObjValuename")
    localStorage.removeItem("mealObjValuename")
    localStorage.removeItem("mealObjValuemeal_variation_id")

    // this.opentheUpdatePopUp()
  }

  updateSet(mealName){
    if(this.nameInputCheckforRegistration(mealName)==true){
      this.mealFullObjfortheRegistration={"Id":this.mealID,"name":mealName,"meal_variation_id":0,"meal_variation_name":""}

      this.inputJustifierService.InputCheck("updateMeal",this.mealObjfortheRegistration.Id,"updateSet",this.mealObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      this.updatetheLists()

      this.router.route('dashboard')
    }
  }

  delete(ID){
      this.inputJustifierService.InputCheck("deleteMeal",ID,"delete",null).subscribe(data=>{
        alert(data)
      })
  }

  deletewithPrompt(ID) {
    if(confirm("Are you sure to delete the meal?")) {
      this.delete(ID)
      
      alert("succesful!")

      this.updatetheLists()
    }
  }
}
