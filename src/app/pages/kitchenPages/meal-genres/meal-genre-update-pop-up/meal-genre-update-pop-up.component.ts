import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meal_genre } from 'src/app/models/fortheKitchen/meal_genre';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-meal-genre-update-pop-up',
  templateUrl: './meal-genre-update-pop-up.component.html',
  styleUrls: ['./meal-genre-update-pop-up.component.css']
})
export class MealGenreUpdatePopUpComponent implements OnInit {
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
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.gettheLabelsandHeaders()

    this.gettheLists('Meal_genreList')
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

  updateSet(mealGenreName){
    if(this.nameInputCheckforRegistration(mealGenreName)==true){
      this.mealGenreObjfortheRegistration={"Id":Number(this.inputJustifierService.storageDataList[0]),"name":mealGenreName}

      this.inputJustifierService.InputCheck("updateMeal_genre",this.mealGenreObjfortheRegistration.Id,"updateSet",this.mealGenreObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")
      
      this.updatetheLists()

      this.inputJustifierService.closetheDialogs()
    }
  }
}
