import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';

@Component({
  selector: 'app-event-publish',
  templateUrl: './event-publish.component.html',
  styleUrl: './event-publish.component.css'
})
export class EventPublishComponent implements OnInit{
  form: FormGroup = new FormGroup({
    Event_Name: new FormControl(''),

  });
  submitted = false;
  
result : any

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],
    });
    var url = 'https://localhost:44376/api/EventController/EventOperation';
    var data =  {
      flag : 'SELECTNAME'
    }
   
    this.apicall.call(url,JSON.stringify(data)).subscribe((res:any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.result = res.ArrayOfResponse;

        console.log(this.result);
      }

    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    var url = 'https://localhost:44376/api/EventController/EventOperation';
    var data =  {
      flag : 'PUBLISH',
      Event_Name : this.form.controls['Event_Name'].value,

    }
   
    this.apicall.call(url,JSON.stringify(data)).subscribe((res:any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.result = res.ArrayOfResponse;

        console.log(this.result);
      }

    })
    this.submitted = false;
  }

}
