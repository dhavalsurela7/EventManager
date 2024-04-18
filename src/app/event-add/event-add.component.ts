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

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrl: './event-add.component.css',
})
export class EventAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  Base64: string;
  Currentdate : string;
  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    public share : DashboardService
  ) {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],

      Event_Start_Date: ['', [Validators.required]],
      Event_End_Date: ['', [Validators.required]],
      Event_Image: ['',Validators.required],
      Event_Description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.Currentdate =new Date().toISOString().slice(0, 10);;
  
    
  }

  get f(): {  } {
    return this.form.controls;
  }

  onSubmit(): void {
debugger
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    var data = {
      flag: 'INSERT',
      Event_Name: this.form.controls['Event_Name'].value,
      Event_Start_Date: this.form.controls['Event_Start_Date'].value,
      Event_End_Date: this.form.controls['Event_End_Date'].value,
      Event_Image: this.Base64,
      Event_Description: this.form.controls['Event_Description'].value,
    };
    //insert event
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((result) => {
   
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          document.getElementById('result').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('result').style.display = 'none';
          }, 3000);

    
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

  base(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg'
      ) {
        if (event.target.files[0].size < 2000000) {
          const file = event.target.files[0];

          const reader = new FileReader();

          reader.onload = () => {
            const base64: string = reader.result as string;

       
            this.Base64 = base64.split(',')[1];
          };

          if (file) {
            reader.readAsDataURL(file);
          }
        }
        else{
          alert("Image should be less than 2mb")
        }
      }
      else{
        alert("Only jpeg, jpg and png format are supported")
      }
    }
  }
}
