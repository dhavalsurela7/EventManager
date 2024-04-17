import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../Services/api-call.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css',
})
export class DashboardUserComponent implements OnInit {
  result:any
  selectedcomponent: string;
  constructor(private apicall: ApiCallService) {}
  ngOnInit(): void {
    this.selectedcomponent = '';
    var url = 'api/EventController/EventOperation';
    var data = {
      flag: 'SELECTONGOING',
    };

    this.apicall.call(url, JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
  
        this.result = res.ArrayOfResponse;

        this.result.map((e) => {
          e.Event_Start_Date = e.Event_Start_Date.toString().substring(0, 10);
          e.Event_End_Date = e.Event_End_Date.toString().substring(0, 10);
        });
      }
    });
  }

  load(component: string): void {
    this.selectedcomponent = component;
  }
}
