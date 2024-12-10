import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if a token exists in localStorage (or check any other authentication method)
  const token = localStorage.getItem('token');

  // If no token is found, navigate to the login page
  if (!token) {
    router.navigate(['/login']);
    return false; // Prevent access to the protected route
  }

  // If token is present, allow access
  return true;
};
