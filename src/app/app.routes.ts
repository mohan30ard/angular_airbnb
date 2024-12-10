import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'register' , component: RegisterComponent }, // Public route
  { path: 'aboutUs', component: AboutUsComponent }, // Public route
  { path: 'login', component: LoginComponent }, // Public route
  { path: 'welcome', component: LandingComponent , canActivate: [AuthGuard] }, // Protected route
  { path: '**', redirectTo: '/login' }, // Wildcard route for 404 handling
];

