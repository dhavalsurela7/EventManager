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
    private apicall: ApiCallService
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
    this.select = false;
  }
}
