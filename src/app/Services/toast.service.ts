import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  //Show toast
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  //Remove toast from toasts array
  remove() {
    setTimeout(() => {
      this.toasts = []
      
    }, 2000);
  }
}
