import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  role: string = 'user';

  constructor(private authService:AuthService, private router :Router) {}

  register(): void {
    if (!this.username || !this.email || !this.password || !this.firstName || !this.lastName) {
      alert('Please fill in all the fields');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
    };

    this.authService.registerUser(userData).subscribe(
      (response :any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);  // Navigate to login page after successful registration
      },
      (error :any) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}
