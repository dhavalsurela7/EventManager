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
  NumberOnly,
  number,
} from '../Validation';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  form: FormGroup;
  submitted = false;
  otpsent = false;
  otpverified = false;
  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group({
      User_Email: ['', [Validators.required, Validators.pattern(IsValidEmail)]],
      User_OTP: [],
      User_Password: ['', [Validators.required, Validators.pattern(IsValidPassword)],],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  sendotp() {
    debugger;
    this.submitted = true;
    if (this.form.controls['User_Email'].invalid) {
      return;
    }
    var data = {
      flag: 'exist',
      User_Email: this.form.controls['User_Email'].value,

    };
    var data2 = {
      Email: this.form.controls['User_Email'].value,
    };
    this.apicall.userapiservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.apicall.otpservice(JSON.stringify(data2)).subscribe((result) => {
            if (result != null && result != '' && result != undefined) {
              if (result['ID'] == '200') {
                this.toastService.show('OTP Sent', {
                  classname: 'bg-success text-light',
                  delay: 2000,
                });
                this.toastService.remove();
                this.otpsent = true;
              } else if (result['ID'] == '400') {
                this.toastService.show('Invalid Email', {
                  classname: 'bg-danger text-light',
                  delay: 2000,
                });
                this.toastService.remove();
      
                this.submitted = false;
              } else {
                this.toastService.show('Error in OTP Sending', {
                  classname: 'bg-danger text-light',
                  delay: 2000,
                });
                this.toastService.remove();
      
                this.submitted = false;
              }
            }
          });
        } else if (result['ID'] == '400') {
          this.toastService.show('User with this Email does not exist', {
            classname: 'bg-danger text-light',
            delay: 2000,
          });
          this.toastService.remove();

          this.submitted = false;
        } else {
          this.toastService.show('Error in OTP Sending', {
            classname: 'bg-danger text-light',
            delay: 2000,
          });
          this.toastService.remove();

          this.submitted = false;
        }
      }
    })

   
  }

  verifyotp() {
    if (this.form.controls['User_Email'].invalid) {
      return;
    }

    var data = {
      Otp: this.form.controls['User_OTP'].value,
      Email: this.form.controls['User_Email'].value,
    };
    this.apicall.verifyotpservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.controls['User_OTP'].disabled;
          this.toastService.show('OTP Verified', {
            classname: 'bg-success text-light',
            delay: 2000,
          });
          this.toastService.remove();
          this.otpverified = true;
          this.form.controls['User_Email'].disable();
        } else {
          this.toastService.show('Invalid OTP', {
            classname: 'bg-danger text-light',
            delay: 2000,
          });
          this.toastService.remove();

          this.submitted = false;
        }
      }
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    var data = {
      flag: 'reset',
      User_Email: this.form.controls['User_Email'].value,
      User_Password: this.form.controls['User_Password'].value,
    };
    //insert user
    this.apicall.userapiservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.reset();
          this.toastService.show('Password reset succesfully', {
            classname: 'bg-success text-light',
            delay: 2000,
          });
          this.toastService.remove();
          this.router.navigate(['/login-user']);
        } else {
          this.toastService.show('Error occurred', {
            classname: 'bg-danger text-light',
            delay: 2000,
          });
          this.toastService.remove();
          this.form.reset();
          this.submitted = false;
        }
      }
    });
  }

  //validation on keypress for alphabets and space only
  name(event) {
    return name(event);
  }

  //validation on keypress for numbers only
  number(event) {
    return number(event);
  }
}
