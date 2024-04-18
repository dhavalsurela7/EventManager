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
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      User_Name: [
        '',
        Validators.required,
        Validators.pattern("/^[a-z ,.'-]+$/i"),
      ],

      User_Email: ['', [Validators.required, Validators.email]],
      User_Address: ['', [Validators.required]],
      User_Password: ['', [Validators.required, Validators.minLength(6)]],
      User_Mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
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
    this.apicall.userapiservice( JSON.stringify(data)).subscribe((result) => {
      if (result != null && result != '' && result != undefined) {
        if (result['ID'] == '200') {
          this.router.navigate(['/login-user']);
        } else {
          document.getElementById('failure').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('failure').style.display = 'none';
          }, 3000);
        }
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  name(event) {
    var k;
    k = event.charCode;
    return (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32;
  }
  mobile(event) {
    var k;
    k = event.charCode;
    return (k > 47 && k < 58) || k == 8;
  }
}
