import { Inject, Injectable } from '@angular/core';
import { RoutesService } from '../routes/routes.service';
import { UsersService } from '../users/users.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InputJustifierService {
  storageData:string
  storageDataList:string[]

  constructor(@Inject('chef') private chef, private router:RoutesService, private userService:UsersService, private dialog:MatDialog) { }

  
  gettheList(value){
    var dataList=[]

    this.router.gettheListRoute(this.chef+'/'+value,this.userService.tokenProvider()).subscribe(data=>{
      data.forEach(element => {
        dataList.push(JSON.parse(element))
      });
    })

    return dataList
  }

  filter(listtoFilter,keyName,valuetoFilter){
    var dataList=[]

    listtoFilter.forEach(element => {
      if(element[keyName]==valuetoFilter){
        dataList.push(JSON.parse(JSON.stringify(element)))
      }
    });

    return dataList
  }
  
  gettheList2(value){
    var theText=[]

    this.router.gettheListRoute2(this.chef+'/'+value,this.userService.tokenProvider()).subscribe(data=>{
      theText.push(JSON.parse(data))
    })

    return theText
  }

  textInputJustifier(value,area){
    var result="0"

    if(value.trim()==""){
      alert('the '+area+' can not be empty. Please try again!')

      result="0"
    }
    else if(JSON.stringify(value.trim()).length>50){
      alert('the '+area+' is over than maximum length. Please try again!')

      result="1"
    }
    else{
      result="2"
    }

    return result
  }
  /////////////////////////////////////////////////////////////
  InputSendforReadDeleteUpdatechoose(value,path,Id,event){
    if(Id!=0){
      return this.InputCheck(path,Id,event,null)
    }
    else{
      var result=this.textInputJustifier(value.trim(),"name")

      if(result=="2"){
        alert('your entry is not existed in the list. Please try again!')
      }
    }
  }
  /////////////////////////////////////////////////////////////
  InputSendforUpdatechooseforCompoundObjects(value,obj,Id){
    if(Id!=0){
      return JSON.parse(JSON.stringify(obj))
    }
    else{
      var result=this.textInputJustifier(value.trim(),"name")

      if(result=="2"){
        alert('your entry is not existed in the list. Please try again!')
      }
    }
  }
  /////////////////////////////////////////////////////////////
  InputSendforAddUpdateset(value,path,Id,objId,event,obj,objList){
    if(Id!=0){
      alert('the name you have entered is already in use. Please try again!')
    }
    else{
      var result=this.textInputJustifier(value.trim(),"name")

      if(result=="2"){
        var shouldContinue=true

        objList.forEach(element => {
          if(value==element){
            shouldContinue=false

            alert('the name you have entered is already in use. Please try again!')
          }
        });

        if(shouldContinue==true){
          return this.InputCheck(path,objId,event,obj)
        }
      }
    }
  }
  /////////////////////////////////////////////////////////////
  InputCheck(path,Id,event,object){
    if(event=="read"){
      return this.router.readRoute(this.chef+"/"+path,Id,this.userService.tokenProvider())
    }
    else if(event=="delete"){
      return this.router.deleteRoute(this.chef+"/"+path,Id,this.userService.tokenProvider())
    }
    else if(event=="updateChoose"){
      return this.router.readRoute(this.chef+"/"+path,Id,this.userService.tokenProvider())
    }
    else if(event=="updateSet"){
      return this.router.updateRoute(this.chef+"/"+path,Id,object,this.userService.tokenProvider())
    }
    else if(event=="add"){
      return this.router.addRoute(this.chef+"/"+path,object,this.userService.tokenProvider())
    }
  }

  sendObjecttoLocalStore(obj,objName){
    Object.keys(obj).forEach(key =>{
      localStorage.setItem(objName+key, obj[key]);
    });
  }

  getObjectfromLocalStore(objName){
    var text="{"

    for (var i=0; i<=localStorage.length-1; i++)  
    {  
        var key = localStorage.key(i);  

        var result=key.includes(objName)

        if(result==true){
          var trimmedKey=key.replace(objName,'')

          text=text+'"'+trimmedKey+'":'

          if(key.includes('Id')==false){
            text=text+'"'+localStorage.getItem(key)+'"'
          }
          else{
            text=text+localStorage.getItem(key)
          }

          text=text+','
        }
    }  

    text=text+"}"

    text=text.replace(',}','}')

    return text
  }

  clearObjectfromLocalStore(objName){
    for (var i=0; i<=localStorage.length-1; i++)  
    {  
        var key = localStorage.key(i);  

        var result=key.includes(objName)

        if(result==true){
          localStorage.removeItem(key)
        }
    }  
  }
  
  filltheCarrierObj(obj,value,keyName){ 
    Object.keys(obj).forEach(key =>{
      if(key==keyName){
        obj[key]=value
      }
    });

    return JSON.parse(JSON.stringify(obj))
  }

  closetheDialogs(){
    this.dialog.closeAll()
  }

  usetheLocalStorage(value){
    return localStorage.getItem(value)
  }
}
