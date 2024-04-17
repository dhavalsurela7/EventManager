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
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    User_Email: new FormControl(''),

    User_Password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService,
    private router : Router
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.form = this.formBuilder.group({
      User_Email: ['', [Validators.required, Validators.email]],

      User_Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    var url = 'api/UserController/UserOperation';
    var data = {
      flag: 'login',

      User_Email: this.form.controls['User_Email'].value,

      User_Password: this.form.controls['User_Password'].value,
    };
    this.apicall.call(url, JSON.stringify(data)).subscribe((result) => {
  
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          sessionStorage.clear();
          sessionStorage.setItem("Role","User")
          sessionStorage.setItem("IsLoggedIn",String(true))
          this.router.navigate(['/dashboard-user']);
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


}
