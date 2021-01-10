import { CONFIRM_DIALOG_STATUS } from './../../../shared/enums/confirm-dialog-status.enum';
import { ConfirmDialogComponent } from './../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UserModel } from './../../../models/user.model';
import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  data: UserModel[];
  displayedColumns = ['index', 'username', 'user_avatar', 'action'];
  APP_URL = APP_URL;
  AUTH_URL = AUTH_URL;

  constructor(
    private _usersService: UsersService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onInitData();
  }

  onConfirm(id: number): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    try {
      dialogRef.afterClosed().subscribe(result => {
        const { event } = result;
        switch (event) {
          case CONFIRM_DIALOG_STATUS.confirmed:
            this.onDelete(id);
            break;
          default:
        }
      });
    } catch (ex) { }
  }

  onDelete(id: number): void {
    this._usersService.delete(id).subscribe(response => this.onInitData());
  }

  onInitData(): void {
    this._usersService.findAll().subscribe(response => {
      this.data = response;
    });
  }

}
