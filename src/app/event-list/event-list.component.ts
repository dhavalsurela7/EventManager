import { event } from '../Models/Event';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../Services/api-call.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  result: event[];
  activityresult: any;
  startdate: string;

  submitted = false;

  transformedEvent: event[];

  constructor(
    private apicall: ApiCallService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    var url = 'https://localhost:44376/api/EventController/EventOperation';
    var data = {
      flag: 'SELECT',
    };

    this.apicall.call(url, JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.result = res.ArrayOfResponse;

        // this.result.forEach(element => {
        // element.Event_Start_Date =  element.Event_Start_Date.toString().substring(0,9),
        // element.Event_End_Date = element.Event_End_Date.toString().substring(0,9)

        // });
        this.result.map((e) => {
          e.Event_Start_Date = e.Event_Start_Date.toString().substring(0, 10);
          e.Event_End_Date = e.Event_End_Date.toString().substring(0, 10);
        });
      }
    });
  }

  details(Event_Name: string) {
    // this.router.navigate(['/activity-list'],{ state: { Event_Name: Event_Name } })
    var url2 =
      'https://localhost:44376/api/ActivityController/ActivityOperation';
    var data2 = {
      flag: 'SELECT',
      Event_Name: Event_Name,
    };
    this.apicall.call(url2, JSON.stringify(data2)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.activityresult = res.ArrayOfResponse;
      }
    });
  }
}
