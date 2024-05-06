import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ApiCallService } from '../Services/api-call.service';
import { Router } from '@angular/router';
import {
  IsValidName,
  IsValidEmail,
  IsValidPassword,
  IsValidAddress,
  IsValidMobile,
  name,
  number
} from '../Validation';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router: Router,
    private toastService : ToastService
  ) {
    this.form = this.formBuilder.group({
      User_Name: ['', [Validators.required, Validators.pattern(IsValidName)]],
      User_Email: ['', [Validators.required, Validators.pattern(IsValidEmail)]],
      User_Address: ['',[Validators.required, Validators.pattern(IsValidAddress)],],
      User_Password: ['',[Validators.required,Validators.pattern(IsValidPassword),],],
      User_Mobile: ['',[Validators.required,Validators.pattern(IsValidMobile),],],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      debugger
      return;
    }

    var data = {
      flag: 'register',
      User_Name: this.form.controls['User_Name'].value,
      User_Email: this.form.controls['User_Email'].value,
      User_Address: this.form.controls['User_Address'].value,
      User_Password: this.form.controls['User_Password'].value,
      User_Mobile: this.form.controls['User_Mobile'].value,
    };
    //insert user
    this.apicall.userapiservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.reset();
          this.toastService.show('Registation Successful, Please login', { classname: 'bg-success text-light', delay: 2000 });
          this.toastService.remove();
          this.router.navigate(['/login-user']);
        } else if(result['ID'] == '400')  {
    
          this.toastService.show('User Already Exists', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
          this.form.reset();
          this.submitted= false
        }
        else{
          this.toastService.show('Registration Failed', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
          this.form.reset();
          this.submitted= false
        }
      }
    });
  }

  //validation on keypress for alphabets and space only
  name(event) {
   return name(event)
  }

  //validation on keypress for numbers only
  number(event) {
  return number(event)
  }
}
