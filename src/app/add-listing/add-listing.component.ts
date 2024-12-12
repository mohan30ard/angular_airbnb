import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingService } from '../listing.service';

interface AddListingResponse {
  message: string;
  data: {
    _id: string;
  };
}


@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  addListingForm: FormGroup;
  errorMessages: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient,listingService: ListingService) {
    this.addListingForm = this.fb.group({
      name: ['xyz', Validators.required],
      summary: ['xyz', Validators.required],
      property_type: ['', Validators.required],
      room_type: ['', Validators.required],
      minimum_nights: ['2', [Validators.required, Validators.min(1)]],
      maximum_nights: ['20', [Validators.required, Validators.min(1)]],
      accommodates: ['2', [Validators.required, Validators.min(1)]],
      bedrooms: ['2', [Validators.required, Validators.min(1)]],
      beds: ['2', [Validators.required, Validators.min(1)]],
      bathrooms: ['2', [Validators.required, Validators.min(1)]],
      price: ['100', [Validators.required, Validators.min(0)]],
      address: ['marleee', Validators.required]
    });
  }

  onSubmit() {
    if (this.addListingForm.invalid) {
      this.errorMessages = ['Please fill in all required fields correctly.'];
      return;
    }

    const formData = new FormData();
    Object.keys(this.addListingForm.value).forEach(key => {
      formData.append(key, this.addListingForm.value[key]);
    });

    this.http.post<AddListingResponse>('http://localhost:8000/api/bnb/add', formData).subscribe(
      response => {
        alert('Listing added successfully! id: '  + response.data._id);
        this.addListingForm.reset();
      },
      error => {
        console.error('Error adding listing', error);
        this.errorMessages.push('There was an error submitting the form.');
      }
    );
  }

}
