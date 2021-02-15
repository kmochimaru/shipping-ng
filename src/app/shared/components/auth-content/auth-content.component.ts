import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { AUTH_URL } from './../../../auth/auth-url';
import { APP_URL } from './../../../app-url';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.scss']
})
export class AuthContentComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  APP_URL = APP_URL;
  AUTH_URL = AUTH_URL;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(): void {
    this._auth.clearAuthenticated();
    this._router.navigate(['', APP_URL.LOGIN]);
  }

}
