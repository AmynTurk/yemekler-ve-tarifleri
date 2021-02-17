import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Meal_genre } from 'src/app/models/fortheKitchen/meal_genre';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

import { MatDialog } from '@angular/material/dialog';
import { MealAddPopUpComponent } from '../meals/meal-add-pop-up/meal-add-pop-up.component';
import { MealGenreAddPopUpComponent } from './meal-genre-add-pop-up/meal-genre-add-pop-up.component';
import { MealGenreUpdatePopUpComponent } from './meal-genre-update-pop-up/meal-genre-update-pop-up.component';



@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-meal-genres',
  templateUrl: './meal-genres.component.html',
  styleUrls: ['./meal-genres.component.css']
})
export class MealGenresComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  mealGenreID:number

  mealGenreObjfortheRegistration:Meal_genre
  mealGenreRealList:Meal_genre[]=[]
  mealGenreDisplayList:Meal_genre[]=[]

  constructor(@Inject('chef') private chef, 
               private objectConstructor:ObjectConstructorService,
               private router:RoutesService,
               private userService:UsersService,
               private inputJustifierService:InputJustifierService,
               private dialog:MatDialog) { 
               }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('Meal_genreList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  openthePopUp(){
    const dialogRef = this.dialog.open(MealGenreAddPopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  opentheUpdatePopUp(){
    const dialogRef = this.dialog.open(MealGenreUpdatePopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  closethePopUp(){
    this.dialog.closeAll()
  }
  
  gettheLists(path1){
    this.mealGenreRealList=this.inputJustifierService.gettheList(path1)
    this.mealGenreDisplayList=this.mealGenreRealList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.mealGenreObjfortheRegistration={"Id":0,"name":""}
  }


  cleartheDisplayList(value){
    this.mealGenreDisplayList=[]

    this.mealGenreRealList.forEach(element => {
      this.mealGenreDisplayList.push(element)
    });

    if(value!="0"){
      for (var i = 0; i < this.mealGenreDisplayList.length; i++) {
        if(this.mealGenreDisplayList[i].Id!=value ){
          this.mealGenreDisplayList.splice(i,1);
          i--;
        }
      }
    }
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

    this.mealGenreRealList.forEach(element => {
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
    this.mealGenreRealList=this.inputJustifierService.gettheList("Meal_genreList")
    this.mealGenreDisplayList=this.mealGenreRealList
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
          this.mealGenreObjfortheRegistration={"Id":0,"name":name}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  add(mealGenreName){
    if(this.nameInputCheckforRegistration(mealGenreName)==true){
      this.inputJustifierService.InputCheck("addMeal_genre",null,"add",this.mealGenreObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      this.updatetheLists()
    }
  }

  updateChoose(obj){
    this.inputJustifierService.storageDataList=[]

    this.mealGenreObjfortheRegistration=JSON.parse(JSON.stringify(obj))
    
    this.inputJustifierService.storageDataList.push(this.mealGenreObjfortheRegistration.Id.toString())
    this.inputJustifierService.storageDataList.push(this.mealGenreObjfortheRegistration.name)

    // this.inputJustifierService.storageDataList[0]=this.mealObjfortheRegistration.name
    this.inputJustifierService.sendObjecttoLocalStore(this.mealGenreObjfortheRegistration,"mealGenreObjValue")

    this.inputJustifierService.storageData=this.inputJustifierService.usetheLocalStorage("mealGenreObjValuename")
    localStorage.removeItem("mealGenreObjValue")
    localStorage.removeItem("mealGenreObjValuename")

    this.opentheUpdatePopUp()
  }

  updateSet(mealGenreName){
    if(this.nameInputCheckforRegistration(mealGenreName)==true){
      this.mealGenreObjfortheRegistration={"Id":this.mealGenreID,"name":mealGenreName}

      this.inputJustifierService.InputCheck("updateMeal_genre",this.mealGenreObjfortheRegistration.Id,"updateSet",this.mealGenreObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      this.updatetheLists()

      this.router.route('dashboard')
    }
  }

  delete(ID){
      this.inputJustifierService.InputCheck("deleteMeal_genre",ID,"delete",null).subscribe(data=>{
        alert(data)})
  }

  deletewithPrompt(ID) {
    if(confirm("Are you sure to delete the meal?")) {
      this.delete(ID)
      
      alert("succesful!")

      this.updatetheLists()
    }
  }
}
