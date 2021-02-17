import { Routes } from '@angular/router';
import { ChefLoginComponent } from 'src/app/pages/loginFull/chef-login/chef-login.component';
import { UserLoginComponent } from 'src/app/pages/loginFull/user-login/user-login.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'chefLogin',          component: ChefLoginComponent },
    { path: 'userLogin',          component: UserLoginComponent },
    { path: 'register',       component: RegisterComponent }
];
