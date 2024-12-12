import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing_og } from '../models/Airbnb_og.model';
import { ListingService } from '../listing.service';
export interface UpdateListingData {
  // price: { $numberDecimal: string } | number;
  minimum_nights: number;
  accommodates: number;
  property_type: string;
  name: string;
}

@Component({
  selector: 'app-update-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './update-listing.component.html',
  styleUrl: './update-listing.component.css'
})
export class UpdateListingComponent {
  updateList :boolean = false;
  listingId: string = '';  // Will hold the Listing ID
  listingData: UpdateListingData = {
    // price: 0,
    minimum_nights: 0,
    accommodates: 0,
    property_type: '',
    name: '',
  };  // Will hold the listing data
  errorMessage: string = '';  // To show error messages

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  getListing(): void {
    if (!this.listingId) {
      this.errorMessage = 'Please enter a valid Listing ID';
      return;
    }

    this.listingService.getListingById(this.listingId).subscribe({
      next: (listing) => {
        this.listingData.minimum_nights = listing.minimum_nights;
        this.listingData.accommodates = listing.accommodates;
        this.listingData.property_type = listing.property_type;
        this.listingData.name = listing.name;
        this.errorMessage = ''; // Reset any error messages
        this.updateList = true;
      },
      error: (err) => {
        this.errorMessage = 'Listing not found or failed to fetch data';
        console.error(err);
      }
    });
  }

  updateListing(): void {
    console.log('Updating listing:', this.listingData);
    this.listingService.updateListing(this.listingId, this.listingData).subscribe(
        (updatedListing) => {
          console.log('Listing updated successfully:', updatedListing);
          alert('Listing updated successfully');
          this.router.navigate(['/view-listings']); // Redirect to the listings page after update
        },
        (error) => {
          console.error('Error updating listing:', error);
          this.errorMessage = 'Failed to update listing. Please try again later.';
        }
      );
  }


}
