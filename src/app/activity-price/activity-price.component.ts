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
  selector: 'app-activity-price',
  templateUrl: './activity-price.component.html',
  styleUrl: './activity-price.component.css'
})
export class ActivityPriceComponent {
  form: FormGroup = new FormGroup({
    Event_Name: new FormControl(''),
    Activity_Name: new FormControl(''),
    Activity_Price: new FormControl(''),
  });
  submitted = false;
  
result : any
activityresult : any

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],
      Activity_Name: ['', Validators.required],
      Activity_Price: ['', Validators.required],
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

  activity(event: any){
    var url = 'https://localhost:44376/api/ActivityController/ActivityOperation';
    var data =  {
      flag : 'SELECTNAME',
      Event_Name: this.form.controls['Event_Name'].value,
    }
   
    this.apicall.call(url,JSON.stringify(data)).subscribe((res:any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.activityresult = res.ArrayOfResponse;

        console.log(this.activityresult);
      }

    })
  }

  onSubmit(): void {
    this.submitted = true;
    var url = 'https://localhost:44376/api/ActivityController/ActivityOperation';
    var data =  {
      flag : 'SETPRICE',
      Event_Name : this.form.controls['Event_Name'].value,
      Activity_Name : this.form.controls['Activity_Name'].value,
      Activity_Price : this.form.controls['Activity_Price'].value,

    }
   
    this.apicall.call(url,JSON.stringify(data)).subscribe((res:any) => {
      if (res != null && res != '' && res != undefined) {
        console.log(res);
        this.result = res.ArrayOfResponse;
        document.getElementById('result').style.display = 'block';
        this.form.reset();
        setTimeout(() => {
          document.getElementById('result').style.display = 'none';
        }, 3000);
        console.log(this.result);
        this.form.reset();
      }
      else{
        document.getElementById('failure').style.display = 'block';
        this.form.reset();
        setTimeout(() => {
          document.getElementById('failure').style.display = 'none';
        }, 3000);
      }

    })
    this.submitted = false;
  }
}