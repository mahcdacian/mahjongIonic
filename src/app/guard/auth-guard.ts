import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from '../shared/app.service';
import 'firebase/auth';
import { ERROR_MESSAGE } from '../shared/message.strings';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private appService: AppService) { }

  canActivate(): boolean {
    if (!this.appService.authenticated) {
      this.appService.presentToast( ERROR_MESSAGE.ERR_USER_NOT_LOGGED, 'danger' );
      this.router.navigate(['/users/login']);
      return false;
    }
    return true;
  }

}