import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {
  userDetails :User | null = null;
  propertyId: string = '';
  property: any = {}; // Store the property details here
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private listingService: ListingService, // Assuming you have a data service
    private authService: AuthService // Assuming you have an auth service
  ) {}

  ngOnInit(): void {
    this.propertyId = this.listingService.getCurrentListing(); // Get the property ID from the service
    this.fetchPropertyDetails(); // Fetch the property details
    this.fetchUserDetails(); // Fetch the user details
  }

  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe({
      next: (response: any) => {
        this.userDetails = response;
        this.isAdmin = this.userDetails?.role === 'admin';
        console.log(this.isAdmin);
        console.log('User details:', this.userDetails);
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      },
    });
  }

  // this.authService.getUserDetails().subscribe({
  //   next: (response: any) => {
  //     this.userDetails = response;
  //     this.userRole = this.userDetails?.role || 'user';
  //     console.log('User details:', this.userDetails);
  //     this.filterNavDataBasedOnRole();
  //   },
  //   error: (err) => {
  //     console.error('Failed to fetch user details:', err);
  //   },
  // });

  fetchPropertyDetails(): void {
    this.listingService.getListingById(this.propertyId).subscribe({
      next: (data) => {
        this.property = data;
      },
      error: (err) => {
        console.error('Error fetching property details', err);
      },
    });
  }

  deleteListing(): void {
    const confirmDelete = confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) {
      return;
    }

    this.listingService.deleteListing(this.propertyId).subscribe(
      (response) => {
        console.log(response.message);
        alert('Listing deleted successfully!');
        this.router.navigate(['/view-listings']); // Redirect to listings page
      },
      (error) => {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing. Please try again later.');
      }
    );
  }
}
