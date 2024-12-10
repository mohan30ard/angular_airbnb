import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { RouterOutlet , RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
