import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm(): void {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      this._auth.onLogin(this.form.value).subscribe(response => {
        const { access_token } = response;
        this._auth.setAuthenticated(access_token);
        this._router.navigate(['', 'auth', 'dashboard']);
      }, err => console.log(err.error.message));
    }
  }

}
