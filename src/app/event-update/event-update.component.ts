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
import { event } from '../Models/Event';
import { CharacterAndOptionalSpace,name}  from '../Validation'
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrl: './event-update.component.css',
})
export class EventUpdateComponent implements OnInit {
  result: any;
  form: FormGroup;
  submitted = false;
  Base64: string;
  Currentdate: string;
  ename: string;
  estartdate: string;
  eenddate: string;
  edescription: string;
  eimage: string;
  select = false;
  show = false;
  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    public share: DashboardService,
    private toastService : ToastService
  ) {
    this.form = this.formBuilder.group({
      Event_Name: ['', Validators.required],
      New_Event_Name: ['', [Validators.required,Validators.pattern(CharacterAndOptionalSpace)]],
      Event_Start_Date: ['', [Validators.required]],
      Event_End_Date: ['', [Validators.required]],
      Event_Image: [''],
      Event_Description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.Currentdate = new Date().toISOString().slice(0, 10);

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

  get f(): {} {
    return this.form.controls;
  }

  name(event){
    return name(event)
  }
  //setting selected event's details in form
  details() {
    this.select = true;
    // this.flag = true;
    (this.ename = this.form.controls['Event_Name'].value),
      this.result.forEach((element) => {
        if (element.Event_Name == this.ename) {
          this.edescription = element.Event_Description;
          this.estartdate = element.Event_Start_Date.toString()
            .substring(0, 10)
            .split('-')
            .reverse()
            .join('-');
          this.eenddate = element.Event_End_Date.toString()
            .substring(0, 10)
            .split('-')
            .reverse()
            .join('-');
          this.eimage = element.Event_Image;
        }

        this.form.controls['New_Event_Name'].setValue(this.ename);
        this.form.controls['Event_Description'].setValue(this.edescription);
        this.form.controls['Event_Start_Date'].setValue(this.estartdate);
        this.form.controls['Event_End_Date'].setValue(this.eenddate);
      });
  }

  onSubmit(): void {
    debugger
    this.submitted = true;
    if (this.select == false) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    var data = {
      flag: 'UPDATE',
      Event_Name: this.form.controls['Event_Name'].value,
      Event_Start_Date: this.form.controls['Event_Start_Date'].value,
      Event_End_Date: this.form.controls['Event_End_Date'].value,
      Event_Image: this.Base64,
      Event_Description: this.form.controls['Event_Description'].value,
      New_Event_Name: this.form.controls['New_Event_Name'].value,
    };
    //update event
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((result) => {
      debugger
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.reset();
          this.toastService.show('Event updated successfuly', { classname: 'bg-success text-light', delay: 2000 });
          this.toastService.remove();
          this.ngOnInit();
        } else {
          this.form.reset();
          this.toastService.show('Error in Event updating', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
        }
      }
    });
    this.submitted = false;
    this.select = false;
  }

  //converting image to base64 string
  //if image is in jpeg,png.jpg format and less than 2mb
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
        } else {
          alert('Image should be less than 2mb');
        }
      } else {
        alert('Only jpeg, jpg and png format are supported');
      }
    }
  }
}
