import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit } from 'src/app/models/fortheKitchen/unit';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { ObjectConstructorService } from 'src/app/services/objectConstructor/object-constructor.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { UnitAddPopUpComponent } from './unit-add-pop-up/unit-add-pop-up.component';
import { UnitUpdatePopUpComponent } from './unit-update-pop-up/unit-update-pop-up.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
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
    private router:RoutesService, private userService:UsersService, 
    private inputJustifierService:InputJustifierService,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.gettheLabelsandHeaders()

    this.gettheLists('UnitList')
  }
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  opentheAddPopUp(){
    const dialogRef = this.dialog.open(UnitAddPopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
  }

  opentheUpdatePopUp(){
    const dialogRef = this.dialog.open(UnitUpdatePopUpComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updatetheLists()
    });
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

  updatetheLists(){
    this.unitRealList=this.inputJustifierService.gettheList("UnitList")
    this.unitDisplayList=this.unitRealList
  }

  cleartheDisplayList(value){
    this.unitDisplayList=[]

    this.unitRealList.forEach(element => {
      this.unitDisplayList.push(element)
    });

    if(value!="0"){
      for (var i = 0; i < this.unitDisplayList.length; i++) {
        if(this.unitDisplayList[i].Id!=value ){
          this.unitDisplayList.splice(i,1);
          i--;
        }
      }
    }
  }

  updateChoose(obj){
    this.inputJustifierService.storageDataList=[]

    this.unitObjfortheRegistration=JSON.parse(JSON.stringify(obj))
    
    this.inputJustifierService.storageDataList.push(this.unitObjfortheRegistration.Id.toString())
    this.inputJustifierService.storageDataList.push(this.unitObjfortheRegistration.name)

    this.unitID=this.unitObjfortheRegistration.Id

    this.inputJustifierService.sendObjecttoLocalStore(this.unitObjfortheRegistration,"unitObjValue")

    this.inputJustifierService.storageData=this.inputJustifierService.usetheLocalStorage("unitObjValuename")
    localStorage.removeItem("unitObjValue")
    localStorage.removeItem("unitObjValuename")

    this.opentheUpdatePopUp()
  }

  delete(ID){
      this.inputJustifierService.InputCheck("deleteUnit",ID,"delete",null).subscribe(data=>{
        alert(data)})
  }

  deletewithPrompt(ID) {
    if(confirm("Seçili miktar birimini silmek istediğinizden emin misiniz?")) {
      this.delete(ID)
      
      alert("succesful!")

      this.updatetheLists()
    }
  }
}
