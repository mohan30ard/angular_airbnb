import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '../listing.service';
import { Listing_og } from '../models/Airbnb_og.model';
import { RouterModule , Router} from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './view-listing.component.html',
  styleUrl: './view-listing.component.css'
})
export class ViewListingComponent implements OnInit, OnChanges {

  // Data and pagination properties
  data: any[] = []; // Holds the data for the current page
  totalItems: number = 5571; // Total number of items (for pagination purposes)
  itemsPerPage: number = 5; // Number of items per page
  @Input() currentPage: number = 1; // Current page number
  isLoadingListings: boolean = false; // Flag to show loading state

  // Filter properties
  filter = {
    priceMin: null,
    priceMax: null,
    minNights: null,
    accommodates: null,
    listingId: ''
  };

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['itemsPerPage']) {
      this.fetchResults(); // Fetch new data when currentPage changes
    }
    // if (changes['itemsPerPage']) {
    //   this.fetchResults(); // Fetch new data when itemsPerPage changes
    // }
  }

  // Method to fetch results with the applied filters
  fetchResults(): void {
    this.isLoadingListings = true;

    // Build the filter query parameters
  const queryParams: { [key: string]: string | number } = {
    page: this.currentPage,
    perPage: this.itemsPerPage,
  };

  // Conditionally add filters only if they are set
  if (this.filter.priceMin != null) {
    queryParams['price_min'] = this.filter.priceMin;
  }
  if (this.filter.priceMax != null) {
    queryParams['price_max'] = this.filter.priceMax;
  }
  if (this.filter.minNights != null) {
    queryParams['minimum_nights'] = this.filter.minNights;
  }
  if (this.filter.accommodates != null) {
    queryParams['accommodates'] = this.filter.accommodates;
  }
  if (this.filter.listingId.trim()) {
    queryParams['listingId'] = this.filter.listingId.trim();
  }

  console.log('queryParams:', queryParams);
    // Call the service with the filter query params
    this.listingService.getAllListings(queryParams).subscribe({

      next: (response: Listing_og[]) => {
        this.data = response.map((listing) => {
          // Ensure price is a valid number
          if (listing.price && typeof listing.price === 'object' && listing.price.$numberDecimal) {
            listing.price = parseFloat(listing.price.$numberDecimal);
          }
          return listing;
        });
        this.isLoadingListings = false;
      },
      error: (err) => {
        console.error('Failed to fetch listings:', err);
        this.isLoadingListings = false;
      },
      complete: () => {
        this.isLoadingListings = false;
      },
    });
  }

  // Method for applying the filters (to be called by a button)
  applyFilters(): void {
    this.fetchResults();
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage = page;
      this.fetchResults();
    }
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.fetchResults();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchResults();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Method to select a listing and navigate to its detail page
  onSelectListing(listingId: string): void {
    this.listingService.setCurrentListing(listingId);
    this.router.navigate(['/view-property']);
  }
}
