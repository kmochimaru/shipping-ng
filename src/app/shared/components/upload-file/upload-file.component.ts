import { environment } from '../../../../environments/environment';
import { AttachmentModel } from '../../../models/attachment.model';
import { AttachmentsService } from './../../services/attachments.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UploadsService } from '../../services/uploads.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnChanges {

  @Input() docCode: string;
  attachFile: File;
  preview: any;
  private _attachItem: AttachmentModel;
  ENV = environment;

  @Output() attachIdEvent = new EventEmitter<number>();

  constructor(
    private _uploads: UploadsService,
    private _attachments: AttachmentsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(typeof changes);
    // console.log(changes);
    // console.log(JSON.stringify(changes));
  }

  @Input('attachItem')
  set attachItem(attachment: AttachmentModel) {
    this._attachItem = attachment;
    if (this._attachItem?.attach_path) {
      this.preview = `${this.ENV.coreAPI}api/v1/${this._attachItem.attach_path}`;
    }
  }

  get attachItem(): AttachmentModel {
    return this._attachItem;
  }

  onSelectImage(input: HTMLInputElement): void {
    if (input) {
      this.attachFile = input.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.attachFile);
      reader.onload = () => {
        this.preview = reader.result;
        this.onUpload();
      };
    }
  }

  async onUpload(): Promise<void> {
    const { path } = await this._uploads.onUpload(this.attachFile, 'image');
    this._attachments.create({
      attach_file_name: this.attachFile.name,
      attach_file_type: this.attachFile.type,
      attach_path: path,
      attach_doc_code: this.docCode ? this.docCode : null
    }).subscribe(res => {
      this._attachItem = res;
      this.attachIdEvent.emit(this._attachItem.attach_id);
    });
  }

  onRemove(): void {
    const fileName = this._attachItem.attach_path.split('/');
    this._attachments.delete(this._attachItem.attach_id).subscribe(res => {
      this._uploads.onRemove(
        'images',
        fileName[fileName.length - 1])
        .catch(err => console.error(err));
      this.preview = '';
      this.attachFile = null;
      this._attachItem = null;
    });
  }

}
