import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
      routeLink: 'view-bookings',
      icon: 'fal fa-calendar-check',
      label: 'View Bookings'
    },
    {
        routeLink: 'add-listing',
        icon: 'fal fa-plus-square',
        label: 'Add Listing',
        roles: ['admin']
    },
    {
        routeLink: 'view-listings',
        icon: 'fal fa-eye',
        label: 'View Listings'
    },
    {
        routeLink: 'update-listing',
        icon: 'fal fa-edit',
        label: 'Update Listing',
        roles: ['admin']
    },
    {
      routeLink: 'profile',
      icon: 'fal fa-user',
      label: 'Profile'
    },
    {
      routeLink: 'logout',
      icon: 'fal fa-sign-out',
      label: 'Logout'
    }
];
