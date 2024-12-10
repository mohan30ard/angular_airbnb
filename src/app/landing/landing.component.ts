import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
userDetails : User | null = null;
  constructor(private authService:AuthService,
              private router:Router
  ) { }

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (response: any) => {
        this.userDetails = response;
        console.log('User details:', this.userDetails);
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      },
    });
  }

  logout() {
    localStorage.clear();  // This will clear all items in localStorage
    this.router.navigate(['/login']);
  }
}
