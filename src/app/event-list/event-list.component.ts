import {event} from '../Models/Event'
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
  flag = false;
  ename : string
  estartdate : string
  eenddate : string
  edescription : string
  eimage : string
  show = false;
  submitted = false;

  transformedEvent: event[];

  constructor(
    private apicall: ApiCallService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    var data = {
      flag: 'SELECT',
    };
    //select all published events
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

  details(Event_Name: string,Event_Start_Date:string,Event_End_Date:string,Event_Description:string,Event_Image:string) {

    this.flag = true;
    this.ename = Event_Name
    this.estartdate = Event_Start_Date
    this.eenddate = Event_End_Date
    this.edescription = Event_Description
    this.eimage = Event_Image


    var data2 = {
      flag: 'SELECT',
      Event_Name: Event_Name,
    };
    //retrieving activities based on event name
    this.apicall.activityapiservice(JSON.stringify(data2)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {

        this.activityresult = res.ArrayOfResponse;
      }
    });
  }
}
