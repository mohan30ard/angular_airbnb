import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router , RouterModule} from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { CommonModule } from '@angular/common';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule , RouterModule, SublevelMenuComponent ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SideNavComponent implements OnInit {
  userDetails :User | null = null;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  isAdmin: boolean = false;
  userRole: string = this.userDetails?.role || 'user';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router,private authService: AuthService) {}

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.authService.getUserDetails().subscribe({
        next: (response: any) => {
          this.userDetails = response;
          this.userRole = this.userDetails?.role || 'user';
          console.log('User details:', this.userDetails);
          this.filterNavDataBasedOnRole();
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
        },
      });
  }

  filterNavDataBasedOnRole() {
    this.navData = this.navData.filter(item =>
      !item.roles || item.roles.includes(this.userRole) // Filter items based on roles
    );
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
