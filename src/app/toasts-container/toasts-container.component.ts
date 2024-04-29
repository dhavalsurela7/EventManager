import { Component,TemplateRef } from '@angular/core';
import {ToastService} from '../Services/toast.service'

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.css',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainerComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
