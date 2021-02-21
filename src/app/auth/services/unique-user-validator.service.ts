import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, switchMap, take } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserValidatorService {

  params = new HttpParams();

  constructor(
    private _users: UsersService
  ) { }

  existingUsernameValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (control.value === null || control.value === '') {
        return of(null);
      } else {
        this.params = this.params.set('filter', `username||$eq||${control.value}`);
        return control.valueChanges.pipe(
          debounceTime(500),
          take(1),
          switchMap(_ =>
            this._users.findAll({ params: this.params })
              .pipe(
                map(response => {
                  return response.length > 0 ? { existingUsername: { value: control.value } } : null;
                }
                )
              )
          )
        );
      }
    };
  }
}
