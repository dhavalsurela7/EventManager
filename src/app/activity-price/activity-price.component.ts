import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallService } from '../Services/api-call.service';
import { DashboardService } from '../Services/dashboard.service';
import {number} from '../Validation'
import { ToastService } from '../Services/toast.service';
import $ from "jquery";

@Component({
  selector: 'app-activity-price',
  templateUrl: './activity-price.component.html',
  styleUrl: './activity-price.component.css',
})
export class ActivityPriceComponent {
  form: FormGroup;
  submitted = false;
  show = false;
  activityshow = false;
  result: any;
  activityresult: any;
  isactive = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    public share: DashboardService,
    private toastService : ToastService,
    private currencyPipe : CurrencyPipe,
    
  ) {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],
      Activity_Name: ['', Validators.required],
      Activity_Price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    var data = {
      flag: 'SELECTNAME',
    };
  
    //retrieving event names
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

  activity(event: any) {
    var data = {
      flag: 'SELECTNAME',
      Event_Name: this.form.controls['Event_Name'].value,
    };
    //retrieving activity names based on event name
    this.apicall
      .activityapiservice(JSON.stringify(data))
      .subscribe((res: any) => {
        if (res != null && res != '' && res != undefined) {
          this.activityresult = res.ArrayOfResponse;

          this.activityshow = true;
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var data = {
      flag: 'SETPRICE',
      Event_Name: this.form.controls['Event_Name'].value,
      Activity_Name: this.form.controls['Activity_Name'].value,
      Activity_Price: this.form.controls['Activity_Price'].value,
    };
    //updating price column
    this.apicall
      .activityapiservice(JSON.stringify(data))
      .subscribe((res: any) => {
        if (res != null && res != '' && res != undefined) {
          if (res['ID'] == '200') {
            this.result = res.ArrayOfResponse;
            this.toastService.show('Price added successfuly', { classname: 'bg-success text-light', delay: 2000 });

            this.form.reset();
          } else {
            this.toastService.show('Error in Price adding', { classname: 'bg-danger text-light', delay: 2000 });

          }
        }
      });
    this.submitted = false;
  }



 

  //validation on keypress for numbers only
  number(event) {
    return number(event)
}


}








