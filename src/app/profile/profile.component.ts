import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user :User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserDetails().subscribe( // Ensure `.getUserDetails()` is invoked
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Failed to load user profile', error);
      }
    );
  }

  logout(): void {
    // Clear any stored authentication tokens
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
