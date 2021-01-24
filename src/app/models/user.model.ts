import { AttachmentModel } from './attachment.model';

export class UserModel {
    user_id?: number;
    username: string;
    password?: string;
    user_avatar?: string;
    user_phone_number: string;
    user_email: string;
    attachments: AttachmentModel;
}
