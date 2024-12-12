export interface Listing_og {
  _id: string;
  listing_url: string;
  name: string;
  summary: string;
  space: string;
  description: string;
  neighborhood_overview: string;
  notes: string;
  transit: string;
  access: string;
  interaction: string;
  house_rules: string;
  property_type: string;
  room_type: string;
  bed_type: string;
  minimum_nights: number;
  maximum_nights: number;
  cancellation_policy: string;
  last_scraped: Date;
  calendar_last_scraped: Date;
  first_review: Date;
  last_review: Date;
  accommodates: number;
  bedrooms: number;
  beds: number;
  number_of_reviews: number;
  bathrooms: number; // Used number instead of Decimal128 for simplicity
  amenities: string[];
  price: { $numberDecimal: string } | number; // Used number instead of Decimal128 for simplicity
  security_deposit?: number; // Optional field
  cleaning_fee?: number; // Optional field
  extra_people?: number; // Optional field
  guests_included?: number; // Optional field
  images: {
    thumbnail_url: string;
    medium_url: string;
    picture_url: string;
    xl_picture_url: string;
  };
  host: {
    host_id: string;
    host_name: string;
    host_location: string;
    host_about: string;
    host_response_time: string;
    host_response_rate: string;
    host_acceptance_rate: string;
    host_is_superhost: boolean;
    host_thumbnail_url: string;
    host_picture_url: string;
    host_neighbourhood: string;
  };
  address: {
    street: string;
    suburb: string;
    government_area: string;
    market: string;
    country: string;
  };
  availability: {
    availability_30: number;
    availability_60: number;
    availability_90: number;
    availability_365: number;
  };
  review_scores: {
    review_scores_rating: number;
    review_scores_accuracy: number;
    review_scores_cleanliness: number;
    review_scores_checkin: number;
    review_scores_communication: number;
    review_scores_location: number;
    review_scores_value: number;
  };
  reviews: {
    reviewer_id: string;
    reviewer_name: string;
    comments: string;
  }[];
}
