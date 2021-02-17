import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/mealSpecies', title: 'Yemeğin Çeşitleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/mealGenres', title: 'Yemek Türleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/meals', title: 'Yemekler',  icon:'ni-basket text-yellow', class: '' },
    { path: '/mealsandRecipes', title: 'Yemek Tarifleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/mealandIngredients', title: 'Yemekler ve Malzemeleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/ingredients', title: 'Malzemeler',  icon:'ni-basket text-yellow', class: '' },
    { path: '/ingredientGenres', title: 'Malzeme Türleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/units', title: 'Miktar Birimleri',  icon:'ni-basket text-yellow', class: '' },
    { path: '/preparingProcesses', title: 'Yemek Hazırlama İşlemleri',  icon:'ni-basket text-yellow', class: '' },

    { path: '/chefLogin', title: 'chefLogin',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
