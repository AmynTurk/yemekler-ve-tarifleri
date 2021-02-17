import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Meal } from 'src/app/models/fortheKitchen/meal';
import { InputJustifierService } from 'src/app/services/inputs/input-justifier.service';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { MealsComponent } from '../meals/meals.component';


@Component({
  selector: 'app-popup-inner',
  templateUrl: './popup-inner.component.html',
  styleUrls: ['./popup-inner.component.css']
})
export class PopupInnerComponent  implements OnInit {

  mealObjfortheRegistration:Meal
  
  mealRealList:Meal[]=[]
  mealDisplayList:Meal[]=[]
  
  constructor(private mealsComponent:MealsComponent) {}

  ngOnInit() {
    
  }
  
  
  add(name){
    this.mealsComponent.add(name)
  }
}

