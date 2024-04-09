import { event } from '../Models/Event';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit{
  result: event[];
  startdate : string;
  form: FormGroup = new FormGroup({});
  submitted = false;

  transformedEvent : event[];

  constructor(private apicall: ApiCallService, private router: Router, private  datePipe: DatePipe) {}

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
        this.result.map((e)=>{
         e.Event_Start_Date = e.Event_Start_Date.toString().substring(0,10);
         e.Event_End_Date = e.Event_End_Date.toString().substring(0,10);
        })
     
      }
    });
    
         
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
