import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

 

  constructor(private http: HttpClient) { }
  public call(url, data) {
      debugger
      
      const headers = { 'Content-Type': 'application/json', "Accept": "application/json" }
   
      console.log(data)
      return this.http.post(url, data, { 'headers': headers, })
    }
}
