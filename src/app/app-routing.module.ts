import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { myauthGuard } from './myauth.guard';
import { HomeComponent } from './home/home.component';
import { DashboardAdminHomeComponent } from './dashboard-admin-home/dashboard-admin-home.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventPublishComponent } from './event-publish/event-publish.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { EventDeleteComponent } from './event-delete/event-delete.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { ActivityPriceComponent } from './activity-price/activity-price.component';
import { EventListComponent } from './event-list/event-list.component';
import { DashboardUserHomeComponent } from './dashboard-user-home/dashboard-user-home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChartComponent } from './chart/chart.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardAdminHomeNewComponent } from './dashboard-admin-home-new/dashboard-admin-home-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {
    path: 'register-user',
    component: RegisterUserComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login-user',
    component: LoginUserComponent,
  },
  {
    path: 'login-admin',
    component: LoginAdminComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [myauthGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardAdminHomeComponent },
      { path: 'newdashboard', component: DashboardAdminHomeNewComponent },
      { path: 'event-add', component: EventAddComponent },
      { path: 'event-publish', component: EventPublishComponent },
      { path: 'event-update', component: EventUpdateComponent },
      { path: 'event-delete', component: EventDeleteComponent },
      { path: 'activity-add', component: ActivityAddComponent },
      { path: 'activity-price', component: ActivityPriceComponent },
      { path: 'chart', component: ChartComponent },
    ],
  },
  {
    path: 'user',
    component: DashboardUserComponent,
    canActivate: [myauthGuard],
    data: { role: 'user' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardUserHomeComponent },
      { path: 'event-list', component: EventListComponent },
      { path: 'chart', component: ChartComponent },
    ],
  },
  { path: '**', component: PagenotfoundComponent , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
