import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from '../shared/app.service';
import 'firebase/auth';
import { ERROR_MESSAGE } from '../shared/message.strings';
import * as firebase from 'firebase';
import { MESSAGE_TYPE } from '../shared/app.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private appService: AppService) { }

  canActivate(): boolean {
    if (!localStorage.getItem('authToken')) {
      this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
        'danger');
      this.router.navigate(['/users/login']);
      return false;
    }
    return true;
  }

}
