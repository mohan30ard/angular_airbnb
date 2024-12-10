import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule , MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  clicked(): void {
    console.log('You clicked me!');
    alert('You clicked me!');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
