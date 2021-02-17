import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectConstructorService {
  constructor(@Inject('chef') private chef, private http:HttpClient, private users:UsersService) { }

  provideCombinedObjectList(path){
    return this.http.get<string[]>(this.chef+'/'+path,{headers:this.users.tokenProvider()})
  }

  provideCombinedObject(path){
    return this.http.get<string>(this.chef+'/'+path,{headers:this.users.tokenProvider()})
  }
}
