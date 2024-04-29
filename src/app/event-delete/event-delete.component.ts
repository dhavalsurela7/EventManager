import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-event-delete',
  templateUrl: './event-delete.component.html',
  styleUrl: './event-delete.component.css',
})
export class EventDeleteComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  show = false;
  result: any;
  select = false;
  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private toastService : ToastService
  ) {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    

    var data = {
      flag: 'SELECTALL',
    };
    //select all events
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        this.result = res.ArrayOfResponse;
        this.show = true;
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
   
    this.submitted = true;
    if (this.select==false) {
      return
      
    }

    var data = {
      flag: 'DELETE',
      Event_Name: this.form.controls['Event_Name'].value,
    };
    //delete event
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.toastService.show('Event added successfuly', { classname: 'bg-success text-light', delay: 2000 });

          this.ngOnInit();
     
        } else {
          this.toastService.show('Error in Event adding', { classname: 'bg-danger text-light', delay: 2000 });

 
        }
      }
    });
    this.submitted = false;
    this.select= false
  }
}
