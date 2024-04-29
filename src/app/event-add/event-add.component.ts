import { Component, OnInit,TemplateRef } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';
import { DashboardService } from '../Services/dashboard.service';
import {CharacterAndOptionalSpace,name} from '../Validation'
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../Services/toast.service'

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrl: './event-add.component.css',
})
export class EventAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  Base64: string;
  bootstrap : any = ""
  Currentdate: string;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    public share: DashboardService,
    public toastService: ToastService
  ) {
    this.form = this.formBuilder.group({
      Event_Name: ['', [Validators.required,Validators.pattern(CharacterAndOptionalSpace)]],
      Event_Start_Date: ['', [Validators.required]],
      Event_End_Date: ['', [Validators.required]],
      Event_Image: ['', Validators.required],
      Event_Description: ['', [Validators.required]],
    });
  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
  ngOnInit(): void {
    //getting current date
    this.Currentdate = new Date().toISOString().slice(0, 10);
  }

  get f(): {} {
    return this.form.controls;
  }
name(event){
  return name(event)
}
  onSubmit(): void {
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
        this.toastService.show('Event added successfuly', { classname: 'bg-success text-light', delay: 2000 });
        } else {
          this.toastService.show('Error in Event adding', { classname: 'bg-danger text-light', delay: 2000 });
        }
      }
    });
    this.submitted = false;
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
