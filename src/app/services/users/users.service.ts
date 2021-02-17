import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticateModel } from 'src/app/models/forUsers/authenticateModel';
import { User } from 'src/app/models/forUsers/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user:User

  constructor(@Inject('users') private users, private http:HttpClient) { }

  authenticateModel:AuthenticateModel

  authenticate(authModel){
    return this.http.post<User>(this.users+'/authenticate/authenticate',authModel)
  }

  registertheLocalStorage(user){
    Object.keys(user).forEach(key =>{
      localStorage.setItem(key+'Value',user[key]);
    });
  }

  tokenProvider(){
    const reqHeader = new HttpHeaders({ 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("tokenValue")
       });
    
    return reqHeader
  }


  provideUserInfos(){
    this.user={
      "Id":Number(localStorage.getItem("IdValue")),
      "name":localStorage.getItem("nameValue"),
      "password":localStorage.getItem("passwordValue"),
      "role":localStorage.getItem("roleValue"),
      "surname":localStorage.getItem("surnameValue"),
      "token":localStorage.getItem("tokenValue"),
      "username":localStorage.getItem("usernameValue")
    }
    
    return this.user
  }
}
