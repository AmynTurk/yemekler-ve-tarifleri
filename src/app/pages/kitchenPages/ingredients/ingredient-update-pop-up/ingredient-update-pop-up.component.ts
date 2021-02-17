import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/ingredientFullObject';
import { Ingredient } from 'src/app/models/fortheKitchen/ingredient';
import { Ingredient_genre } from 'src/app/models/fortheKitchen/ingredient_genre';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-ingredient-update-pop-up',
  templateUrl: './ingredient-update-pop-up.component.html',
  styleUrls: ['./ingredient-update-pop-up.component.css']
})
export class IngredientUpdatePopUpComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  IngredientObjforRegistration:Ingredient
  IngredientList:Ingredient[]=[]

  Ingredient_genreList:Ingredient_genre[]=[]
  
  IngredientFullInfoforRegistration:IngredientFullObject
  IngredientFullInfoRealList:IngredientFullObject[]=[]
  IngredientFullInfoDisplayList:IngredientFullObject[]=[]


  constructor(@Inject('chef') private chef, 
              private objectConstructor:ObjectConstructorService, 
              private router:RoutesService, 
              private userService:UsersService, 
              private inputJustifierService:InputJustifierService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('provideIngredientFullInfos','Ingredient_genreList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  gettheLists(path1,path2){
    this.IngredientFullInfoRealList=this.inputJustifierService.gettheList(path1)
    this.IngredientFullInfoDisplayList=this.IngredientFullInfoRealList

    this.Ingredient_genreList=this.inputJustifierService.gettheList(path2)
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.IngredientObjforRegistration={"Id":0,"name":"","ingredient_genre_id":0}
    this.IngredientFullInfoforRegistration={"Id":0,"name":"","ingredient_genre_id":0,"ingredient_genre_name":""}
  }


  cleartheIngredientDisplayList(value){
    this.IngredientFullInfoDisplayList=[]

    this.IngredientFullInfoRealList.forEach(element => {
      this.IngredientFullInfoDisplayList.push(element)
    });

    if(value!="0"){
      for (var i = 0; i < this.IngredientFullInfoDisplayList.length; i++) {
        if(this.IngredientFullInfoDisplayList[i].ingredient_genre_id!=value ){
          this.IngredientFullInfoDisplayList.splice(i,1);
          i--;
        }
      }
    }
  }


  doesInputsEmpty(name,Id){
    if(name=="" || Id=="" || Id==0){
      return true
    }
    else{
      return false
    }
  }
  //           ||           //              
  //           ||           //
  doestheNameSuitable(name,subObjID){
    var result=true

    this.IngredientFullInfoRealList.forEach(element => {
      if(subObjID==element.ingredient_genre_id){
        if(name==element.name){
          alert("the name you have entered is already in used for the choosen ingredient genre. Please type different one.")
          
          result=false
        }
      }
    });

    return result
  }
  //           ||           //              
  //           ||           //
  updatetheLists(){
    this.IngredientFullInfoRealList=this.inputJustifierService.gettheList("provideIngredientFullInfos")
    this.IngredientFullInfoDisplayList=this.IngredientFullInfoRealList
  }
  //           ||           //              
  //           \/           //
  nameInputCheckforRegistration(name,subObjID){
    var result=this.inputJustifierService.textInputJustifier(name,'name')

    var result2=false
    
    if(result=="2"){
      if(this.doesInputsEmpty(name,subObjID)==false){
        if(this.doestheNameSuitable(name,subObjID)==true){
          ////kayıt
          this.IngredientObjforRegistration={"Id":0,"name":name,"ingredient_genre_id":subObjID}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  updateSet(ingredientName,ingredientGenreId){
    if(this.nameInputCheckforRegistration(ingredientName,ingredientGenreId)==true){
      this.IngredientObjforRegistration={"Id":Number(this.inputJustifierService.storageDataList[0]),"name":ingredientName,"ingredient_genre_id":ingredientGenreId}

      this.inputJustifierService.InputCheck("updateIngredient",this.IngredientObjforRegistration.Id,"updateSet",this.IngredientObjforRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")
      
      this.updatetheLists()

      this.inputJustifierService.closetheDialogs()
    }
  }
}
