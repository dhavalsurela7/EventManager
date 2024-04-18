import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';
import { DashboardService } from '../Services/dashboard.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrl: './activity-add.component.css',
})
export class ActivityAddComponent implements OnInit {
  EventName: string;
  Mindate: string;
  Maxdate: string;
  form: FormGroup;
  submitted = false;
  Base64: string;
  result: any;
  show = false;
  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    public share: DashboardService
  ) {
    this.form = this.formBuilder.group({
      Activity_Name: ['', Validators.required],
      Activity_Description: ['', [Validators.required]],

      Activity_Start_Datetime: ['', [Validators.required]],
      Activity_End_Datetime: ['', [Validators.required]],
      Event_Name: ['', Validators.required],
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
        console.log(this.result)
        this.show = true;
        console.log(this.show)
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    var data = {
      flag: 'INSERT',
      Activity_Name: this.form.controls['Activity_Name'].value,
      Activity_Description: this.form.controls['Activity_Description'].value,
      Activity_Start_Datetime:
        this.form.controls['Activity_Start_Datetime'].value,
      Activity_End_Datetime: this.form.controls['Activity_End_Datetime'].value,
      Event_Name: this.form.controls['Event_Name'].value,
    };
    //insert activity 
    this.apicall.activityapiservice( JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          document.getElementById('result').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('result').style.display = 'none';
          }, 3000);

          this.ngOnInit();
        } else {
          document.getElementById('failure').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('failure').style.display = 'none';
          }, 3000);
        }
      }
    });
    this.submitted = false;
  }

  eventdate() {
    (this.EventName = this.form.controls['Event_Name'].value),
      this.result.forEach((element) => {
        if (element.Event_Name == this.EventName) {
          this.Mindate =
            element.Event_Start_Date.toString()
              .substring(0, 10)
              .split('-')
              .reverse()
              .join('-') + 'T00:00';

          this.Maxdate =
            element.Event_End_Date.toString()
              .substring(0, 10)
              .split('-')
              .reverse()
              .join('-') + 'T00:00';
        }
      });
  }
}
