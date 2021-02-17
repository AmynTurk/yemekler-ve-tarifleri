import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { IngredientsComponent } from 'src/app/pages/kitchenPages/ingredients/ingredients.component';
import { IngredientGenresComponent } from 'src/app/pages/kitchenPages/ingredient-genres/ingredient-genres.component';
import { MealGenresComponent } from 'src/app/pages/kitchenPages/meal-genres/meal-genres.component';
import { MealsComponent } from 'src/app/pages/kitchenPages/meals/meals.component';
import { UnitsComponent } from 'src/app/pages/kitchenPages/units/units.component';

import { PopupInnerComponent } from 'src/app/pages/kitchenPages/popup-inner/popup-inner.component';
import { MealVariation } from 'src/app/models/fortheKitchen/mealVariation';

import { MealandIngredientComponent } from 'src/app/pages/kitchenPages/mealand-ingredient/mealand-ingredient.component';
import { MealandRecipeComponent } from 'src/app/pages/kitchenPages/mealand-recipe/mealand-recipe.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'mealGenres',    component: MealGenresComponent },
    { path: 'meals',    component: MealsComponent },
    { path: 'mealandIngredients',    component: MealandIngredientComponent },
    { path: 'mealsandRecipes',    component: MealandRecipeComponent },
    { path: 'ingredients',    component: IngredientsComponent },
    { path: 'ingredientGenres',    component: IngredientGenresComponent },
    { path: 'units',    component: UnitsComponent },

    
    { path: 'popupInner',    component: PopupInnerComponent },



    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
