import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private router:Router, private http:HttpClient) { }

  route(path){
    this.router.navigate(['/'+path])
  }


  addRoute(path,obj,header){
    return this.http.post<string>(path,obj,{headers:header})
  }
  readRoute(path,id,header){
    return this.http.get<string>(path+'?Id='+id,{headers:header})
  }
  updateRoute(path,id,obj,header){
    return this.http.put<string>(path+'/'+id,obj,{headers:header})
  }
  deleteRoute(path,id,header){
    return this.http.delete<string>(path+'/'+id,{headers:header})
  }

  gettheListRoute(path,header){
    return this.http.get<string[]>(path,{headers:header})
  } 

  gettheListRoute2(path,header){
    return this.http.get<string>(path,{headers:header})
  }
}
