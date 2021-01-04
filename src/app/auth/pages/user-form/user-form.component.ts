import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { Router } from '@angular/router';
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

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.onInitForm();
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
      this._usersService.create(this.form.value).subscribe(response => {
        this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
      });
    }
  }

}
