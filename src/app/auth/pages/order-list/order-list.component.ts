import { CONFIRM_DIALOG_STATUS } from './../../../shared/enums/confirm-dialog-status.enum';
import { ConfirmDialogComponent } from './../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { OrderModel } from './../../../models/order.model';
import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  data: OrderModel[];
  displayedColumns = ['index', 'order_code', 'order_contact_name', 'action'];
  APP_URL = APP_URL;
  AUTH_URL = AUTH_URL;

  constructor(
    private _ordersService: OrdersService,
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
    this._ordersService.delete(id).subscribe(response => this.onInitData());
  }

  onInitData(): void {
    this._ordersService.findAll().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

}
