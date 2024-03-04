import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';
import { authGuard } from './core/guards/auth.guard';

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
  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () => import('./presentation/home/home.component').then(m => m.HomeComponent)
  },

];