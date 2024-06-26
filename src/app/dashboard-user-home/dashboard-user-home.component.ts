import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../Services/api-call.service';
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-dashboard-user-home',
  templateUrl: './dashboard-user-home.component.html',
  styleUrl: './dashboard-user-home.component.css'
})
export class DashboardUserHomeComponent implements OnInit {
  result: any;

  constructor(
    private apicall: ApiCallService,
    public share: DashboardService
  ) {}
  ngOnInit(): void {
    this.share.selectedcomponent = '';

    var data = {
      flag: 'SELECTONGOING',
    };
    //select ongoing events
    //event start date < current date < event end date
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        this.result = res.ArrayOfResponse;

        this.result.map((e) => {
          e.Event_Start_Date = e.Event_Start_Date.toString().substring(0, 10);
          e.Event_End_Date = e.Event_End_Date.toString().substring(0, 10);
        });
      }
    });
  }
}
