import { Component } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { ApiCallService } from '../Services/api-call.service';

@Component({
  selector: 'app-dashboard-admin-home',
  templateUrl: './dashboard-admin-home.component.html',
  styleUrl: './dashboard-admin-home.component.css'
})
export class DashboardAdminHomeComponent {
  publishresult: any;
  unpublishresult: any;
  deleteresult: any;
  flag = false;
  ename: string;
  estartdate: string;
  eenddate: string;
  edescription: string;
  eimage: string;
  activityresult : any
  close = false;
  constructor(

    private apicall: ApiCallService
  ) {}
  result: any;
  show = false;
  ngOnInit(): void {
 
    this.close = false;
    var data = {
      flag: 'SELECTALL',
    };
    //select all events
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        this.result = res.ArrayOfResponse;
        this.show = true;

        this.result.map((e) => {
          e.Event_Start_Date = e.Event_Start_Date.toString().substring(0, 10);
          e.Event_End_Date = e.Event_End_Date.toString().substring(0, 10);
        });
      }
    });
  }

  publish(eventname: string) {
    var data = {
      flag: 'PUBLISH',
      Event_Name: eventname,
    };
    //update isactive to 1
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.publishresult = res.ArrayOfResponse;

          this.ngOnInit();
        }
      }
    });
  }

  unpublish(eventname: string) {
    var data = {
      flag: 'UNPUBLISH',
      Event_Name: eventname,
    };
    //update isactive to 0
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.unpublishresult = res.ArrayOfResponse;
          this.ngOnInit();
        }
      }
    });
  }

  //deleting event
  delete(eventname: string) {
    var del = confirm('Are you sure ?');

    if (del) {
      var data = {
        flag: 'DELETE',
        Event_Name: eventname,
      };
      debugger;
      this.apicall
        .eventapiservice(JSON.stringify(data))
        .subscribe((res: any) => {
          if (res != null && res != '' && res != undefined) {
            if (res['ID'] == '200') {
              debugger;

              this.ngOnInit();
            }
          }
        });
    }
  }

  details(
    result
  ) {
    this.flag = true;
    this.ename = result.Event_Name;
    this.estartdate = result.Event_Start_Date;
    this.eenddate = result.Event_End_Date;
    this.edescription = result.Event_Description;
    this.eimage = result.Event_Image;
 
    var data2 = {
      flag: 'SELECT',
      Event_Id: result.Event_Id,
    };
    //retrieving activities based on event name
    this.apicall
      .activityapiservice(JSON.stringify(data2))
      .subscribe((res: any) => {
        if (res != null && res != '' && res != undefined) {
          this.activityresult = res.ArrayOfResponse;
        }
      });
  }
}
