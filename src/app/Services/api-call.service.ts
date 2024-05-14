import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  fullurl: string;
  url = environment.baseurl;

  constructor(private http: HttpClient) {}

  
  public eventapiservice(data) {

    const endpoint = 'api/EventController/EventOperation';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }
  
  public activityapiservice(data) {
    const endpoint = 'api/ActivityController/ActivityOperation';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }

  public otpservice(data) {
    const endpoint = 'api/UserController/SendOtp';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }

  public verifyotpservice(data) {
    const endpoint = 'api/UserController/VerifyOtp';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }

  public userapiservice(data) {
    const endpoint = 'api/UserController/UserOperation';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }

  public chartservice(data):any {
    const endpoint = 'api/EventController/Chart?request=Monthwise';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers }).pipe();
  }

  public adminapiservice(data):Observable<any> {
    const endpoint = 'api/AdminController/AdminOperation';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }
}
