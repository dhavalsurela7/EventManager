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


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    LoginAdminComponent,
    DashboardAdminComponent,
    EventAddComponent,
    EventPublishComponent,
    ActivityAddComponent


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
