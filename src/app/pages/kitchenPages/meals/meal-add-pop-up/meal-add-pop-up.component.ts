import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { Meal } from 'src/app/models/fortheKitchen/meal';
import { MealVariation } from 'src/app/models/fortheKitchen/mealVariation';

import { Meal_genre } from 'src/app/models/fortheKitchen/meal_genre';

import { MealFullObject } from 'src/app/models/fortheKitchen/fullObjects/mealFullObject';

import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-meal-add-pop-up',
  templateUrl: './meal-add-pop-up.component.html',
  styleUrls: ['./meal-add-pop-up.component.css']
})
export class MealAddPopUpComponent implements OnInit {
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


  constructor(
    @Inject('chef') private chef, 
    private objectConstructor:ObjectConstructorService,
    private router:RoutesService,
    private userService:UsersService,
    private inputJustifierService:InputJustifierService
    ) {        
    }

  ngOnInit() {
    this.gettheLists('MealFullList','MealVariationList','mealNameList')

    this.gettheLabelsandHeaders()
  }
  
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
        alert("the name you have entered is already in used for the choosen meal. Please type different one.")
        
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

  add(mealName,mealVariationName){
    if(this.nameInputCheckforRegistration(mealName,mealVariationName)==true){
      this.mealFullObjfortheRegistration={"Id":0,"name":mealName,"meal_variation_id":0,"meal_variation_name":mealVariationName}

      this.inputJustifierService.InputCheck("addMeal",null,"add",this.mealFullObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")

      this.inputJustifierService.closetheDialogs()
    }
  }
}



