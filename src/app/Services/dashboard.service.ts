import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  selectedcomponent: string;
  JWTToken : string
  constructor() {}
  load(component: string): void {
    this.selectedcomponent = component;
  }
}
