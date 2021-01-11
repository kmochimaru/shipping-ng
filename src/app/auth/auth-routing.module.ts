import { AUTH_URL } from './auth-url';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';

const routes: Routes = [
  { path: AUTH_URL.DASHBOARD, component: DashboardComponent },
  { path: AUTH_URL.USER_LIST, component: UserListComponent },
  {
    path: AUTH_URL.USER_FORM, children: [
      { path: '', component: UserFormComponent },
      { path: ':id', component: UserFormComponent }
    ]
  },
  { path: AUTH_URL.ORDER_LIST, component: OrderListComponent },
  {
    path: AUTH_URL.ORDER_FORM, children: [
      { path: '', component: OrderFormComponent },
      { path: ':id', component: OrderFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
