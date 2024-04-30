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
  selector: 'app-event-publish',
  templateUrl: './event-publish.component.html',
  styleUrl: './event-publish.component.css',
})
export class EventPublishComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  select = false;
  result: any;
  show = false;
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
      flag: 'SELECTNAME',
    };
    //select all event names
    this.apicall.eventapiservice( JSON.stringify(data)).subscribe((res: any) => {
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
    if (this.select == false) {
      return;
    }
 
    var data = {
      flag: 'PUBLISH',
      Event_Name: this.form.controls['Event_Name'].value,
    };
    //update isactive to 1
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.form.reset();
          this.toastService.show('Event published successfuly', { classname: 'bg-success text-light', delay: 2000 });
          this.toastService.remove();
          this.ngOnInit();
        } else {
          this.form.reset();
          this.toastService.show('Error in Event publishing', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
        }
      }
    });
    this.submitted = false;
    this.select = false;
  }
}
