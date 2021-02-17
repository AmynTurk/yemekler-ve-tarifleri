import { Component } from '@angular/core';
import { MealsComponent } from './pages/kitchenPages/meals/meals.component';
import { MealGenresComponent } from './pages/kitchenPages/meal-genres/meal-genres.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  title = 'argon-dashboard-angular';
}


