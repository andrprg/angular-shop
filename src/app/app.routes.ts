import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "login",
    loadComponent: () => import('./presentation/login/login.component').then(m => m.LoginComponent)
  },
];