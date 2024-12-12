import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListingComponent } from './update-listing.component';

describe('UpdateListingComponent', () => {
  let component: UpdateListingComponent;
  let fixture: ComponentFixture<UpdateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
