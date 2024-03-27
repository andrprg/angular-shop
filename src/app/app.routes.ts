import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "login",
    loadComponent: () => import('./presentation/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: "home",
    loadComponent: () => import('./presentation/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: "product/:id",
    loadComponent: () => import('./presentation/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
];