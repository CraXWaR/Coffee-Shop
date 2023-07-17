import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateComponent } from './pages/create/create.component';
import { DetailsComponent } from './pages/details/details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    data: {
      title: 'Catalog Page',
    },
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: 'Create Page',
    },
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: {
      title: 'Details Page',
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile Page',
    },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Your Cart',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
