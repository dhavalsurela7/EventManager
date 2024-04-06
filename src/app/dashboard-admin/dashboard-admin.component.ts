import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {

  selectedcomponent: string
  ngOnInit(): void {
    this.selectedcomponent = ''
  }
  debugger
  load(component: string): void {
    this.selectedcomponent = component
  }
}
