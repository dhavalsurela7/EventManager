import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
   selectedcomponent : string
   debugger
load(component : string) : void{
 this.selectedcomponent = component
}
}
