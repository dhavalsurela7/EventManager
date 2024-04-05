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

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent implements OnInit{
  form: FormGroup = new FormGroup({
    Admin_Email: new FormControl(''),

    Admin_Password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Admin_Email: ['', [Validators.required, Validators.email]],

      Admin_Password: ['', [Validators.required, Validators.minLength(6)]],
    });
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
    var url = 'https://localhost:44376/api/AdminController/AdminOperation';
    var data = {
      flag: 'login',

      Admin_Email: this.form.controls['Admin_Email'].value,

      Admin_Password: this.form.controls['Admin_Password'].value,
    };
    this.apicall.call(url, JSON.stringify(data)).subscribe((result) => {
      console.warn(result);
      if (result != null && result != '' && result != undefined) {
        if (result['Message'] == '200|Login Success') {
          this.router.navigate(['/dashboard-admin']);
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
