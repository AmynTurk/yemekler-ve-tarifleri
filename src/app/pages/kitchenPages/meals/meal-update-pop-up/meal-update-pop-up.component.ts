import { Component, Inject, OnInit } from '@angular/core';
import { MealFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealFullObject';
import { Meal } from 'src/app/models/fortheKitchen/meal';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-meal-update-pop-up',
  templateUrl: './meal-update-pop-up.component.html',
  styleUrls: ['./meal-update-pop-up.component.css']
})
export class MealUpdatePopUpComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  mealID:number

  mealObjfortheRegistration:Meal
  
  mealRealList:Meal[]=[]
  mealDisplayList:Meal[]=[]

  mealFullObjfortheRegistration:MealFullObject
  mealFullRealList:MealFullObject[]=[]
  mealFullDisplayList:MealFullObject[]=[]

  constructor(
    @Inject('chef') private chef, 
    private objectConstructor:ObjectConstructorService,
    private router:RoutesService,
    private userService:UsersService,
    private inputJustifierService:InputJustifierService
    ) {        
    }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('MealFullList')
  }
  
  
  gettheLists(path1){
    this.mealFullRealList=this.inputJustifierService.gettheList(path1)
    this.mealFullDisplayList=this.mealFullRealList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.mealFullObjfortheRegistration=JSON.parse(JSON.stringify(this.inputJustifierService.getObjectfromLocalStore("mealObjValue")))

    this.mealID=Number(localStorage.getItem("mealObjValueId"))

    this.inputJustifierService.clearObjectfromLocalStore("mealObjValue")
  }


  cleartheDisplayList(value){
    this.mealDisplayList=[]

    this.mealRealList.forEach(element => {
      this.mealDisplayList.push(element)
    });

    if(value!="0"){
      for (var i = 0; i < this.mealDisplayList.length; i++) {
        if(this.mealDisplayList[i].Id!=value ){
          this.mealDisplayList.splice(i,1);
          i--;
        }
      }
    }
  }

  doesInputsEmpty(mealName,mealVariationName){
    if(mealName=="" || mealVariationName==""){
      return true
    }
    else{
      return false
    }
  }
  //           ||           //              
  //           ||           //
  doestheNameSuitable(mealName,mealVariationName){
    var result=true

    this.mealFullRealList.forEach(element => {
      if(mealName==element.name && mealVariationName==element.meal_variation_name){
        alert("the name you have entered is already in used for the choosen ingredient genre. Please type different one.")
        
        result=false
      }
    });

    return result
  }
  //           ||           //              
  //           ||           //
  updatetheLists(){
    this.mealRealList=this.inputJustifierService.gettheList("MealList")
    this.mealDisplayList=this.mealRealList
  }
  //           ||           //              
  //           \/           //
  nameInputCheckforRegistration(mealName,mealVariationName){
    var result=this.inputJustifierService.textInputJustifier(mealName,'name')

    var result2=false
    
    if(result=="2"){
      if(this.doesInputsEmpty(mealName,mealVariationName)==false){
        if(this.doestheNameSuitable(mealName,mealVariationName)==true){
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


  updateSet(mealName,mealVariationName){
    if(this.nameInputCheckforRegistration(mealName,mealVariationName)==true){
      this.mealFullObjfortheRegistration={"Id":Number(this.inputJustifierService.storageDataList[0]),"name":mealName,"meal_variation_id":0,"meal_variation_name":mealVariationName}

      this.inputJustifierService.InputCheck("updateMeal",this.mealFullObjfortheRegistration.Id,"updateSet",this.mealFullObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")
      
      this.updatetheLists()

      this.inputJustifierService.closetheDialogs()
    }
  }
}
