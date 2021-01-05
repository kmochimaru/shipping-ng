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

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onInitForm();
    this._activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.onInitValue(params.id);
      }
    });
  }

  onInitForm(): void {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      user_phone_number: [''],
      user_email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (!this.id) {
        this._usersService.create(this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      } else {
        this._usersService.update(this.id, this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      }
    }
  }

  onInitValue(id: number): void {
    this._usersService.findOne(id).subscribe((response: UserModel) => {
      // console.table(response);
      // this.form.get('username').setValue(response.username);
      for (const key of Object.keys(response)) {
        try {
          this.form.get(key).setValue(response[key]);
        } catch (ex) { }
      }
    });
  }

}
