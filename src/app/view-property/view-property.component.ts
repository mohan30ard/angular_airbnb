import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {
  propertyId: string = '';
  property: any = {}; // Store the property details here

  constructor(
    private router: Router,
    private listingService: ListingService // Assuming you have a data service
  ) {}

  ngOnInit(): void {
    this.propertyId = this.listingService.getCurrentListing(); // Get the property ID from the service
    this.fetchPropertyDetails(); // Fetch the property details
  }

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
