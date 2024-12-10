export interface User {
  _id?: string;        // MongoDB ObjectId as a string
  username: string;   // The user's username
  email: string;      // The user's email
  firstName: string;  // The user's first name
  lastName: string;   // The user's last name
  role: 'user' | 'admin'; // User role, can be either 'user' or 'admin'
  createdAt?: string;  // Timestamp for when the user was created
  updatedAt?: string;  // Timestamp for when the user was last updated
  __v?: number;
}
