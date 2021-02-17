import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientFullObject } from 'src/app/models/fortheKitchen/fullObjects/ingredientFullObject';
import { Ingredient } from 'src/app/models/fortheKitchen/ingredient';
import { Ingredient_genre } from 'src/app/models/fortheKitchen/ingredient_genre';
import { Unit } from 'src/app/models/fortheKitchen/unit';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { IngredientAddPopUpComponent } from './ingredient-add-pop-up/ingredient-add-pop-up.component';
import { IngredientUpdatePopUpComponent } from './ingredient-update-pop-up/ingredient-update-pop-up.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  mealID:number

  UnitList:Unit[]=[]

  UnitObj:Unit
  UnitRealList:Unit[]=[]
  UnitDisplayLİst:Unit[]=[]

  IngredientObjforRegistration:Ingredient
  IngredientList:Ingredient[]=[]

  Ingredient_genreList:Ingredient_genre[]=[]
  
  IngredientFullInfoforRegistration:IngredientFullObject
  IngredientFullInfoRealList:IngredientFullObject[]=[]
  IngredientFullInfoDisplayList:IngredientFullObject[]=[]
  

  constructor(@Inject('chef') private chef, 
              private objectConstructor:ObjectConstructorService, 
              private router:RoutesService, private userService:UsersService, 
              private inputJustifierService:InputJustifierService,
              private dialog:MatDialog) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('provideIngredientFullInfos','Ingredient_genreList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  
  opentheAddPopUp(){
    const dialogRef = this.dialog.open(IngredientAddPopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  opentheUpdatePopUp(){
    const dialogRef = this.dialog.open(IngredientUpdatePopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  gettheLists(path1,path2){
    this.IngredientFullInfoRealList=this.inputJustifierService.gettheList(path1)
    this.IngredientFullInfoDisplayList=this.IngredientFullInfoRealList

    this.Ingredient_genreList=this.inputJustifierService.gettheList(path2)
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.IngredientObjforRegistration={"Id":0,"name":"","ingredient_genre_id":0}
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
        if(name==element.ingredient_genre_name){
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
          this.IngredientFullInfoforRegistration={"Id":0,"name":name,"ingredient_genre_id":subObjID,"ingredient_genre_name":""}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  add(ingredientName,ingredientGenreId){
    if(this.nameInputCheckforRegistration(ingredientName,ingredientGenreId)==true){
      this.inputJustifierService.InputCheck("addIngredient",null,"add",this.IngredientFullInfoforRegistration).subscribe(data=>{
        alert(data)
      })

      this.updatetheLists()
    }
  }

  updateChoose(obj){
    this.inputJustifierService.storageDataList=[]

    this.IngredientFullInfoforRegistration=JSON.parse(JSON.stringify(obj))

    this.inputJustifierService.storageDataList.push(this.IngredientFullInfoforRegistration.Id.toString())
    this.inputJustifierService.storageDataList.push(this.IngredientFullInfoforRegistration.name)
    this.inputJustifierService.storageDataList.push(this.IngredientFullInfoforRegistration.ingredient_genre_id.toString())
    this.inputJustifierService.storageDataList.push(this.IngredientFullInfoforRegistration.ingredient_genre_name)

    this.inputJustifierService.storageData=this.IngredientFullInfoforRegistration.name
    this.inputJustifierService.sendObjecttoLocalStore(this.IngredientFullInfoforRegistration,"ingredientObjValue")

    this.inputJustifierService.storageData=this.inputJustifierService.usetheLocalStorage("ingredientObjValuename")
    localStorage.removeItem("ingredientObjValuename")

    this.opentheUpdatePopUp()
  }

  updateSet(ingredientName,ingredientGenreId){
    if(this.nameInputCheckforRegistration(ingredientName,ingredientGenreId)==true){
      this.IngredientObjforRegistration={"Id":this.IngredientFullInfoforRegistration.Id,"name":ingredientName,"ingredient_genre_id":ingredientGenreId}

      this.inputJustifierService.InputCheck("updateIngredient",this.IngredientFullInfoforRegistration.Id,"updateSet",this.IngredientObjforRegistration).subscribe(data=>{
        alert(data)
      })

      this.updatetheLists()

      this.router.route('dashboard')
    }
  }

  delete(ID){
      this.inputJustifierService.InputCheck("deleteIngredient",ID,"delete",null).subscribe(data=>{
        alert(data)})

      this.updatetheLists()
  }

  deletewithPrompt(ID) {
    if(confirm("Are you sure to delete the ingredient?")) {
      this.delete(ID)
      
      alert("succesful!")

      this.updatetheLists()
    }
  }
}
