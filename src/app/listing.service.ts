import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing_og } from './models/Airbnb_og.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  apiUrl = 'http://localhost:8000/search/AirBnBs'; // API URL
  apiUrl2 = 'http://localhost:8000/api/bnb'; // API URL

  currentListing: any = null;

  constructor(private http : HttpClient) {}

  // Method to fetch the listings
  getAllListings(params?: { [key: string]: string | number }): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key].toString());
      });
    }

    return this.http.get<any>(this.apiUrl, { params: httpParams });
  }

  // Method to fetch a single listing by ID
  getListingById(id: string): Observable<any> {
    console.log('id', id);
    return this.http.get<any>(`${this.apiUrl2}/${id}`);
  }

  setCurrentListing(listing: any): void {
    this.currentListing = listing;
  }

  getCurrentListing(): any {
    return this.currentListing;
  }

  updateListing(listingId: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${listingId}`, updateData);
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/${id}`);
  }

}
