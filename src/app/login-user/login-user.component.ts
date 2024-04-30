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
import { DashboardService } from '../Services/dashboard.service';
import { IsValidEmail, IsValidPassword } from '../Validation';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router: Router,
    private share: DashboardService,
    private toastService : ToastService
  ) {
    this.form = this.formBuilder.group({
      User_Email: ['', [Validators.required, Validators.pattern(IsValidEmail)]],

      User_Password: [
        '',
        [Validators.required, Validators.pattern(IsValidPassword)],
      ],
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
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
      flag: 'login',

      User_Email: this.form.controls['User_Email'].value,

      User_Password: this.form.controls['User_Password'].value,
    };
    //user login
    this.apicall.userapiservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.reset();
          this.share.JWTToken = result['Message'];
          sessionStorage.clear();
          sessionStorage.setItem('Role', 'User');
          sessionStorage.setItem('Token', result['Message']);
          sessionStorage.setItem('IsLoggedIn', String(true));
          this.router.navigate(['/dashboard-user']);
        } else {
     
          this.form.reset();
          this.toastService.show('Login failed', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
        }
      }
    });

    this.submitted = false;
  }
}
