import { UploadsService } from './services/uploads.service';
import { AttachmentsService } from './services/attachments.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AuthContentComponent,
    ConfirmDialogComponent,
    UploadFileComponent,
    TruncateTextPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    AttachmentsService,
    UploadsService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    AuthContentComponent,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    UploadFileComponent,
    TruncateTextPipe
  ]
})
export class SharedModule { }
