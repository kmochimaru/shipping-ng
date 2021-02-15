import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { OrdersItemService } from './services/orders-item.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserFormComponent,
    OrderListComponent,
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    UsersService,
    OrdersService,
    OrdersItemService,
    ProductsService
  ]
})
export class AuthModule { }
