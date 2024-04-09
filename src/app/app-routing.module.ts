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

const routes: Routes = [
  {
    path: 'register-user',
    component: RegisterUserComponent,
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
  },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent,
  },
  {
    path: 'event-add',
    component: EventAddComponent,
  },
  {
    path: 'event-publish',
    component: EventPublishComponent,
  },

  {
    path: 'activity-add',
    component: ActivityAddComponent,
  },
  {
    path: 'activity-price',
    component: ActivityPriceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
