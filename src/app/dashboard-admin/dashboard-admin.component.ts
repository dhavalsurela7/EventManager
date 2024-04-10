import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{

constructor(public share:DashboardService){}
  ngOnInit(): void {
    this.share.selectedcomponent = 'event-list'
  }

}
