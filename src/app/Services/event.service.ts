import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  fullurl: string;
  url = environment.baseurl;
  constructor(private http: HttpClient) { }

  public getevents(data) {

    const endpoint = 'api/EventController/GetEvent';
    this.fullurl = this.url + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return this.http.post(this.fullurl, data, { headers: headers });
  }
}
