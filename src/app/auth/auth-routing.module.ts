import { AUTH_URL } from './auth-url';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: AUTH_URL.DASHBOARD, component: DashboardComponent },
  { path: AUTH_URL.USER_LIST, component: UserListComponent },
  {
    path: AUTH_URL.USER_FORM, children: [
      { path: '', component: UserFormComponent },
      { path: ':id', component: UserFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
