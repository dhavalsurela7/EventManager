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
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html',
  styleUrl: './activity-add.component.css'
})
export class ActivityAddComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Activity_Name: new FormControl(''),
    Activity_Description: new FormControl(''),
    Activity_Start_Datetime: new FormControl(''),
    Activity_End_Datetime: new FormControl(''),
    Event_Name : new FormControl('')

  });
  submitted = false;
  Base64: string;
  result : any;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Activity_Name: ['', Validators.required],
      Activity_Description: ['', [Validators.required]],
      
      Activity_Start_Datetime: ['', [Validators.required]],
      Activity_End_Datetime: ['', [Validators.required]],
      Event_Name: ['', Validators.required],
      
    });

    var url = 'https://localhost:44376/api/EventController/EventOperation';
    var data =  {
      flag:"SELECTNAME"
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
    debugger;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    var url = 'https://localhost:44376/api/ActivityController/ActivityOperation';
    var data = {
      flag: 'INSERT',
      Activity_Name: this.form.controls['Activity_Name'].value,
      Activity_Description: this.form.controls['Activity_Description'].value,
      Activity_Start_Datetime: this.form.controls['Activity_Start_Datetime'].value,
      Activity_End_Datetime: this.form.controls['Activity_End_Datetime'].value,
      Event_Name: this.form.controls['Event_Name'].value
    };
    this.apicall.call(url, JSON.stringify(data)).subscribe((result) => {
      console.warn(result);
      if (result != null && result != '' && result != undefined) {
        if (result['Message'] == '200|Activity added successfully') {
          document.getElementById('result').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('result').style.display = 'none';
          }, 3000);

          console.log('Success');
        } else {
          document.getElementById('failure').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('failure').style.display = 'none';
          }, 3000);
          console.log('failure');
        }
      }
    });
    this.submitted = false;
  }

}
