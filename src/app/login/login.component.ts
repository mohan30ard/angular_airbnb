import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router:Router, private authService:AuthService) {}

  //Method to handle login
  login(): void {
    if(this.email == '' || this.password == '') {
      alert('Please enter email and password');
    }
    else {
      this.authService.login(this.email, this.password).subscribe({
        next: (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Save token to localStorage
            alert('Login successful');
            this.router.navigate(['/welcome']); // Redirect to the secure route
          } else {
            alert('Invalid login response: token missing');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please try again.');
        },
      });
    }
  }
}
