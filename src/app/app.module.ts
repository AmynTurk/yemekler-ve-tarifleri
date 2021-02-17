import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { ChefLoginComponent } from './pages/loginFull/chef-login/chef-login.component';
import { UserLoginComponent } from './pages/loginFull/user-login/user-login.component';

import { IngredientGenresComponent } from './pages/kitchenPages/ingredient-genres/ingredient-genres.component';
import { IngredientGenreAddPopUpComponent } from './pages/kitchenPages/ingredient-genres/ingredient-genre-add-pop-up/ingredient-genre-add-pop-up.component';
import { IngredientGenreUpdatePopUpComponent } from './pages/kitchenPages/ingredient-genres/ingredient-genre-update-pop-up/ingredient-genre-update-pop-up.component';

import { IngredientsComponent } from './pages/kitchenPages/ingredients/ingredients.component';
import { IngredientAddPopUpComponent } from './pages/kitchenPages/ingredients/ingredient-add-pop-up/ingredient-add-pop-up.component';
import { IngredientUpdatePopUpComponent } from './pages/kitchenPages/ingredients/ingredient-update-pop-up/ingredient-update-pop-up.component';

import { MealGenresComponent } from './pages/kitchenPages/meal-genres/meal-genres.component';
import { MealGenreAddPopUpComponent } from './pages/kitchenPages/meal-genres/meal-genre-add-pop-up/meal-genre-add-pop-up.component';
import { MealGenreUpdatePopUpComponent } from './pages/kitchenPages/meal-genres/meal-genre-update-pop-up/meal-genre-update-pop-up.component';

import { MealsComponent } from './pages/kitchenPages/meals/meals.component';
import { MealAddPopUpComponent } from './pages/kitchenPages/meals/meal-add-pop-up/meal-add-pop-up.component';
import { MealUpdatePopUpComponent } from './pages/kitchenPages/meals/meal-update-pop-up/meal-update-pop-up.component';

import { UnitsComponent } from './pages/kitchenPages/units/units.component';
import { UnitUpdatePopUpComponent } from './pages/kitchenPages/units/unit-update-pop-up/unit-update-pop-up.component';
import { UnitAddPopUpComponent } from './pages/kitchenPages/units/unit-add-pop-up/unit-add-pop-up.component';

import { PopupInnerComponent } from './pages/kitchenPages/popup-inner/popup-inner.component';
import { PopupInnerAddPopUpComponent } from './pages/kitchenPages/popup-inner/popup-inner-add-pop-up/popup-inner-add-pop-up.component';
import { PopupInnerUpdatePopUpComponent } from './pages/kitchenPages/popup-inner/popup-inner-update-pop-up/popup-inner-update-pop-up.component';


import {MatDialogModule} from '@angular/material/dialog';

import { MealandIngredientComponent } from './pages/kitchenPages/mealand-ingredient/mealand-ingredient.component';
import { MealandRecipeComponent } from './pages/kitchenPages/mealand-recipe/mealand-recipe.component';
import { MealandIngredientSeeComponent } from './pages/kitchenPages/mealand-ingredient/mealand-ingredient-see/mealand-ingredient-see.component';
import { MealandIngredientUpdateComponent } from './pages/kitchenPages/mealand-ingredient/mealand-ingredient-update/mealand-ingredient-update.component';
import { MealandRecipeSeeComponent } from './pages/kitchenPages/mealand-recipe/mealand-recipeSee/mealand-recipe-see/mealand-recipe-see.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule
  ],
  declarations: [	
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ChefLoginComponent,
    UserLoginComponent,
    IngredientsComponent,
    IngredientGenresComponent,
    MealGenresComponent,

    MealsComponent,
    MealAddPopUpComponent,

    UnitsComponent,
    PopupInnerComponent,
    MealUpdatePopUpComponent,
    IngredientGenreAddPopUpComponent,
    IngredientGenreUpdatePopUpComponent,
    IngredientAddPopUpComponent,
    IngredientUpdatePopUpComponent,
    MealGenreAddPopUpComponent,
    MealGenreUpdatePopUpComponent,
    PopupInnerAddPopUpComponent,
    PopupInnerUpdatePopUpComponent,
    UnitUpdatePopUpComponent,
    UnitAddPopUpComponent,
    MealandIngredientComponent,
    MealandRecipeComponent,
    MealandIngredientSeeComponent,
    MealandIngredientUpdateComponent,
    MealandRecipeSeeComponent
   ],
  providers: [
    { provide:'users',useValue:'https://localhost:44335/api/users' },
    { provide:'chef',useValue:'https://localhost:44335/api/chef' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
