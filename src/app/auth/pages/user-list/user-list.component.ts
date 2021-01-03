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

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._usersService.getUsers().subscribe(response => {
      this.data = response;
    });
  }

}
