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
export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'register' , component: RegisterComponent }, // Public route
  { path: 'aboutUs', component: AboutUsComponent }, // Public route
  { path: 'login', component: LoginComponent }, // Public route
  { path: 'welcome', component: LandingComponent , canActivate: [AuthGuard] }, // Protected route
  { path : 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'book-listing',
        component: BookListingComponent
      },
      {
        path: 'add-listing',
        component: AddListingComponent
      },
      {
        path: 'view-listing',
        component: ViewListingComponent
      },
      {
        path: 'view-booking',
        component: ViewBookingsComponent
      }
    ]
  }, // Protected route
  { path: '**', redirectTo: '/login' }, // Wildcard route for 404 handling
];

