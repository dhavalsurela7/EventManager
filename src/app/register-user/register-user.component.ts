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
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent implements OnInit {
  form: FormGroup = new FormGroup({
    User_Name: new FormControl(''),
    User_Email: new FormControl(''),
    User_Address: new FormControl(''),
    User_Password: new FormControl(''),
    User_Mobile: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apicall: ApiCallService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      User_Name: ['', Validators.required],

      User_Email: ['', [Validators.required, Validators.email]],
      User_Address: ['', [Validators.required]],
      User_Password: ['', [Validators.required, Validators.minLength(6)]],
      User_Mobile: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    var url = 'https://localhost:44376/api/UserController/UserOperation';
    var data = {
      flag: 'register',
      User_Name: this.form.controls['User_Name'].value,
      User_Email: this.form.controls['User_Email'].value,
      User_Address: this.form.controls['User_Address'].value,
      User_Password: this.form.controls['User_Password'].value,
      User_Mobile: this.form.controls['User_Mobile'].value,
    };
    this.apicall.call(url, JSON.stringify(data)).subscribe((result) => {
   
      if (result != null && result != '' && result != undefined) {
        if (result['Message'] == '200|Registration Success') {
          document.getElementById('result').style.display = 'block';
          this.form.reset();
          setTimeout(() => {
            document.getElementById('result').style.display = 'none';
          }, 3000);

   
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
}
