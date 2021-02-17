import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient_genre } from 'src/app/models/fortheKitchen/ingredient_genre';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-ingredient-genre-update-pop-up',
  templateUrl: './ingredient-genre-update-pop-up.component.html',
  styleUrls: ['./ingredient-genre-update-pop-up.component.css']
})
export class IngredientGenreUpdatePopUpComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  ingredientGenreID:number

  IngredientGenreObjfortheRegistration:Ingredient_genre
  
  IngredientGenreRealList:Ingredient_genre[]=[]
  IngredientGenreDisplayList:Ingredient_genre[]=[]


  constructor(@Inject('chef') private chef, 
              private objectConstructor:ObjectConstructorService, 
              private router:RoutesService, 
              private userService:UsersService, 
              private inputJustifierService:InputJustifierService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('Ingredient_genreList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  gettheLists(path1){
    this.IngredientGenreRealList=this.inputJustifierService.gettheList(path1)
    this.IngredientGenreDisplayList=this.IngredientGenreRealList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.IngredientGenreObjfortheRegistration=JSON.parse(JSON.stringify(this.inputJustifierService.getObjectfromLocalStore("ingredientGenreObjValue")))

    this.ingredientGenreID=Number(localStorage.getItem("ingredientGenreObjValueId"))

    this.inputJustifierService.clearObjectfromLocalStore("ingredientGenreObjValue")
  }


  cleartheIngredientGenreDisplayList(value){
    this.IngredientGenreDisplayList=[]

    this.IngredientGenreRealList.forEach(element => {
      this.IngredientGenreDisplayList.push(element)
    });

    if(value!="0"){
      for (var i = 0; i < this.IngredientGenreDisplayList.length; i++) {
        if(this.IngredientGenreDisplayList[i].Id!=value ){
          this.IngredientGenreDisplayList.splice(i,1);
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

    this.IngredientGenreRealList.forEach(element => {
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
    this.IngredientGenreRealList=this.inputJustifierService.gettheList("Ingredient_genreList")
    this.IngredientGenreDisplayList=this.IngredientGenreRealList
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
          this.IngredientGenreObjfortheRegistration={"Id":0,"name":name}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  updateSet(ingredientName){
    if(this.nameInputCheckforRegistration(ingredientName)==true){
      this.IngredientGenreObjfortheRegistration={"Id":this.ingredientGenreID,"name":ingredientName}

      this.inputJustifierService.InputCheck("updateIngredient_genre",this.IngredientGenreObjfortheRegistration.Id,"updateSet",this.IngredientGenreObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")
      
      this.updatetheLists()

      this.inputJustifierService.closetheDialogs()
    }
  }
}
