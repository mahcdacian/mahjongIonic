import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppService } from '../shared/app.service';
import 'firebase/auth';
import { ERROR_MESSAGE } from '../shared/message.strings';
import * as firebase from 'firebase';
import { MESSAGE_TYPE } from '../shared/app.model';
import { ParsedProperty } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private afAuth: AngularFireAuth,private router: Router, private appService: AppService) {
    
   }

   canActivate(): boolean {
    
  /*   if (!localStorage.getItem('authToken')) {
      this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
        'success');
      this.router.navigate(['/users/login']);
      return false;
    } */
    this.isLoggedIn().then(
      (val) => {
        if(val){
        }else{
          this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
          'success');
          this.router.navigate(['/users/login']);
        }
      }
  );
    return true;
  }

  isLoggedIn(){

    var promise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          console.log('user is logged in');
          resolve(true);
        } else {
          console.log('user not logged in');
          resolve(false);
        }
      });
    }); 
    return promise;
    
    }

}
