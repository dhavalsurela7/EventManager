import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventPublishComponent } from './event-publish/event-publish.component';
import { ActivityAddComponent } from './activity-add/activity-add.component';
import { ActivityPriceComponent } from './activity-price/activity-price.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { myauthGuard } from './myauth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
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
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [myauthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent,
    canActivate: [myauthGuard],
    data: { role: 'user' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
