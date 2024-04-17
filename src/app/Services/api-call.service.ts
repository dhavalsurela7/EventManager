import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  fullurl : string
  constructor(private http: HttpClient) {}
  public call(endpoint, data) {
    const url = 'https://localhost:44376/'
    this.fullurl = url + endpoint
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }
}
