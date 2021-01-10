import { CONFIRM_DIALOG_STATUS } from './../../enums/confirm-dialog-status.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close({ event: CONFIRM_DIALOG_STATUS.cancel });
  }

  confirmDialog(): void {
    this.dialogRef.close({ event: CONFIRM_DIALOG_STATUS.confirmed });
  }

}
