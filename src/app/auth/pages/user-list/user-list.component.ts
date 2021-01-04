import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  data: any;
  displayedColumns = ['index', 'username', 'user_avatar'];
  APP_URL = APP_URL;
  AUTH_URL = AUTH_URL;

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._usersService.findAll().subscribe(response => {
      this.data = response;
    });
  }

}
