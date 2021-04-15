import { UniqueUserValidatorService } from './../../services/unique-user-validator.service';
import { HttpParams } from '@angular/common/http';
import { UserModel } from './../../../models/user.model';
import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  params = new HttpParams();
  userModel: UserModel;

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _uniqueUserValidator: UniqueUserValidatorService
  ) { }

  ngOnInit(): void {
    this.onInitForm();
    this._activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.form.get('username').clearValidators();
        this.form.get('username').clearAsyncValidators();
        this.form.get('password').clearValidators();
        this.onInitValue(params.id);
      }
    });
  }

  onInitForm(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required], [this._uniqueUserValidator.existingUsernameValidator()]],
      password: ['', Validators.required],
      user_phone_number: [''],
      user_email: ['', [Validators.required, Validators.email]],
      attachments: this._formBuilder.group({
        attach_id: []
      })
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (!this.id) {
        this._usersService.create(this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      } else {
        if (this.form.get('password').value === '') {
          this.form.value.password = this.userModel.password;
        }
        this._usersService.update(this.id, this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      }
    }
  }

  onInitValue(id: number): void {
    this._usersService.findOne(id).subscribe((response: UserModel) => {
      this.userModel = response;
      if (this.userModel.attachments !== null) {
        this.form.get('attachments').get('attach_id').setValue(this.userModel.attachments.attach_id);
      }
      for (const key of Object.keys(this.userModel)) {
        try {
          if (key !== 'password') {
            this.form.get(key).setValue(this.userModel[key]);
          }
        } catch (ex) { }
      }
    });
  }

  setAttachId(id: number): void {
    this.form.get('attachments').get('attach_id').setValue(id);
  }

}
