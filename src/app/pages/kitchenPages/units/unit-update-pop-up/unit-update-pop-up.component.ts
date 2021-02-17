import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit } from 'src/app/models/fortheKitchen/unit';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-unit-update-pop-up',
  templateUrl: './unit-update-pop-up.component.html',
  styleUrls: ['./unit-update-pop-up.component.css']
})
export class UnitUpdatePopUpComponent implements OnInit {
  name:string
  surname:string
  nameList:string[]=[]

  unitID:number

  unitObjfortheRegistration:Unit
  unitRealList:Unit[]=[]
  unitDisplayList:Unit[]=[]

  
  constructor(
    @Inject('chef') private chef, 
    private objectConstructor:ObjectConstructorService, 
    private router:RoutesService, 
    private userService:UsersService, 
    private inputJustifierService:InputJustifierService,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.gettheLabelsandHeaders()

    this.gettheLists('UnitList')
  }

  gettheLists(path1){
    this.unitRealList=this.inputJustifierService.gettheList(path1)
    this.unitDisplayList=this.unitRealList
  }

  gettheLabelsandHeaders(){
    this.name=this.userService.provideUserInfos().name
    this.surname=this.userService.provideUserInfos().surname

    this.unitObjfortheRegistration={"Id":0,"name":""}
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

    this.unitRealList.forEach(element => {
      if(name==element.name){
        alert("the name you have entered is already in used for the choosen unit. Please type different one.")
        
        result=false
      }
    });

    return result
  }
  //           ||           //              
  //           ||           //
  updatetheLists(){
    this.unitRealList=this.inputJustifierService.gettheList("UnitList")
    this.unitDisplayList=this.unitRealList
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
          this.unitObjfortheRegistration={"Id":0,"name":name}

          result2=true
        }
      }
      else{
        alert("you have not complited the informations to save. Please make sure you have entered correctly first.")
      }
    }

    return result2
  }

  updateSet(name){
    if(this.nameInputCheckforRegistration(name)==true){
      this.unitObjfortheRegistration={"Id":Number(this.inputJustifierService.storageDataList[0]),"name":name}

      this.inputJustifierService.InputCheck("updateUnit",this.unitObjfortheRegistration.Id,"updateSet",this.unitObjfortheRegistration).subscribe(data=>{
        alert(data)
      })

      alert("succesful!")
      
      this.updatetheLists()

      this.inputJustifierService.closetheDialogs()
    }
  }
}
