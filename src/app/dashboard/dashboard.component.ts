import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { RouterOutlet , RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BodyComponent } from '../body/body.component';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { ListingService } from '../listing.service';
import { Listing_og } from '../models/Airbnb_og.model';
import { CurrencyPipe } from '@angular/common';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, RouterModule, CommonModule, BodyComponent, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userDetails : User | null = null;
  listings: Listing_og[] = [];
  recentBookings: any[] = [];
  recommendations: any[] = [];
  isLoadingActivities: boolean = false;

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadRecentActivities();
    this.loadRecentBookings();
    this.loadRecommendations();
  }
  constructor(private authService: AuthService,
              private router: Router,
              private listingService: ListingService
  ) {}

  loadUserDetails(): void {
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

  loadRecentActivities(): void {
    this.isLoadingActivities = true;
    this.listingService.getAllListings({ perPage: 5 }).subscribe({
      next: (response: Listing_og[]) => {
        this.listings = response.map(listing => {
          // Ensure price is a valid number
          if (listing.price && typeof listing.price === 'object' && listing.price.$numberDecimal) {
            // Convert $numberDecimal to a float value
            listing.price = parseFloat(listing.price.$numberDecimal);
          }
          return listing;
        });
        this.isLoadingActivities = false;
      },
      error: (err) => {
        console.error('Failed to fetch recent activities:', err);
        this.isLoadingActivities = false;
      },
    });
  }

  loadRecentBookings(): void {
    // Mock data for demonstration
    this.recentBookings = [
      { title: 'Cozy Apartment', date: new Date(), imageUrl: 'assets/img/booking1.jpg' },
      { title: 'Luxury Villa', date: new Date(), imageUrl: 'assets/img/booking2.jpg' },
    ];
  }

  loadRecommendations(): void {
    // Mock data for demonstration
    this.recommendations = [
      {
        title: 'Modern Loft',
        description: 'A spacious and bright loft in the city center.',
        imageUrl: 'assets/img/recommendation1.jpg',
      },
      {
        title: 'Seaside Retreat',
        description: 'Enjoy the ocean view from this beautiful retreat.',
        imageUrl: 'assets/img/recommendation2.jpg',
      },
    ];
  }

  isSideNavCollapsed = false;
  screenWidth = 0;


  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToMyBookings(): void {
    this.router.navigate(['/view-bookings']);
  }

  navigateToMessages(): void {
    this.router.navigate(['/messages']);
  }

  navigateToViewListings(): void {
    this.router.navigate(['/view-listings']);
  }

}
