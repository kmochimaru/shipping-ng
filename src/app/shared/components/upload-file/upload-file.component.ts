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

  // tslint:disable-next-line:variable-name
  private _previewAttachment: AttachmentModel;
  @Input() docCode: string;
  attachFile: File;
  // tslint:disable-next-line:variable-name
  private _tempPath = null;
  preview: any;
  attachItem: AttachmentModel;
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

  @Input('attachPath')
  set attachPath(attachPath: string) {
    if (attachPath) {
      this.preview = `${this.ENV.coreAPI}api/v1/${attachPath}`;
    }
  }

  // tslint:disable-next-line:typedef
  onSelectImage(input: HTMLInputElement) {
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

  // tslint:disable-next-line:typedef
  async onUpload() {
    const { path } = await this._uploads.onUpload(this.attachFile, 'image');
    this._attachments.create({
      attach_file_name: this.attachFile.name,
      attach_file_type: this.attachFile.type,
      attach_path: path,
      attach_doc_code: this.docCode ? this.docCode : null
    }).subscribe(res => {
      this.attachItem = res;
      this.attachIdEvent.emit(this.attachItem.attach_id);
    });
  }

  // tslint:disable-next-line:typedef
  async onRemove() {
    const fileName = this.attachItem
      ? this.attachItem.attach_path.split('/')
      : this.previewAttachment.attach_path.split('/');
    const attachId = this.attachItem ? this.attachItem.attach_id : this.previewAttachment.attach_id;
    await this._attachments.delete(attachId).subscribe(res => { });
    await this._uploads.onRemove(
      'images',
      fileName[fileName.length - 1])
      .catch(err => console.error(err));
    this.preview = '';
    this.attachFile = null;
    this.attachItem = null;
  }

  @Input()
  set previewAttachment(attachment: AttachmentModel) {
    if (attachment) {
      this._previewAttachment = attachment;
      this.preview = `${this.ENV.coreAPI}api/v1/${attachment.attach_path}`;
    }
  }

  // tslint:disable-next-line:typedef
  get previewAttachment() {
    return this._previewAttachment;
  }
}
