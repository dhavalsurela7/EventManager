import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventPublishComponent } from './event-publish/event-publish.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { ActivityPriceComponent } from './activity-price/activity-price.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { EventListComponent } from './event-list/event-list.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { EventUpdateComponent } from './event-update/event-update.component';
import { EventDeleteComponent } from './event-delete/event-delete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { DashboardAdminHomeComponent } from './dashboard-admin-home/dashboard-admin-home.component';
import { DashboardUserHomeComponent } from './dashboard-user-home/dashboard-user-home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChartComponent } from './chart/chart.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';






@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    EventAddComponent,
    EventPublishComponent,
    ActivityAddComponent,
    ActivityPriceComponent,
    DashboardUserComponent,
    EventListComponent,
    HomeComponent,
    EventUpdateComponent,
    EventDeleteComponent,
    ToastsContainerComponent,
    DashboardAdminHomeComponent,
    DashboardUserHomeComponent,
    PagenotfoundComponent,
    ChartComponent,
    ResetPasswordComponent
 
   
 



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
