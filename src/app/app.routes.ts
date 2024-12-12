import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { UpdateListingComponent } from './update-listing/update-listing.component';
export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Default route
  // { path: '/', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'register' , component: RegisterComponent }, // Public route
  { path: 'aboutUs', component: AboutUsComponent }, // Public route
  { path: 'login', component: LoginComponent }, // Public route
  { path: 'welcome', component: LandingComponent },// Protected route
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'book-listing', component: BookListingComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'add-listing', component: AddListingComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'view-listings', component: ViewListingComponent }, // Protected route
  { path: 'view-bookings', component: ViewBookingsComponent }, // Protected route
  { path: 'view-property', component: ViewPropertyComponent }, // Protected route
  { path: 'update-listing', component: UpdateListingComponent }, // Protected route
  // { path: '**', redirectTo: '/login' }, // Wildcard route for 404 handling
];

