import { UsersService } from './services/users.service';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    UsersService
  ]
})
export class AuthModule { }
