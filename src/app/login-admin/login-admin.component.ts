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
import { IsValidEmail, IsValidPassword } from '../Validation';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router: Router,
    private toastService : ToastService
  ) {
    this.form = this.formBuilder.group({
      Admin_Email: [
        '',
        [Validators.required, Validators.pattern(IsValidEmail)],
      ],

      Admin_Password: [
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

      Admin_Email: this.form.controls['Admin_Email'].value,

      Admin_Password: this.form.controls['Admin_Password'].value,
    };
    //admin login
    this.apicall.adminapiservice(JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.form.reset();
          sessionStorage.clear();
          sessionStorage.setItem('Role', 'Admin');
          sessionStorage.setItem('IsLoggedIn', String(true));
          this.router.navigate(['/admin']);
        } else {
          this.form.reset();
          this.toastService.show('Login Failed', { classname: 'bg-danger text-light', delay: 2000 });
          this.toastService.remove();
        }
      }
    });

    this.submitted = false;
  }
}
