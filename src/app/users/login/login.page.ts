import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppService } from '../../shared/app.service';
import { UserInformation, MESSAGE_TYPE } from '../../shared/app.model';
import { Router } from '@angular/router';
import { SUCCESS_MESSAGE } from 'src/app/shared/message.strings';
import { APP_LABELS } from '../../shared/app.labels';
import { ERROR_MESSAGE } from '../../shared/message.strings';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  userDetails: UserInformation = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    postalCode:'',
    id: '',
    email: ''
  };
  email = '';
  password = '';
  forgotPassword = false;
  appLables = APP_LABELS;

  constructor(
    private afAuth: AngularFireAuth,
    public appService: AppService,
    private router: Router
  ) { }

  ngOnInit() { }



  async login() {
    this.appService.showLoader.next(true);
    const { email, password } = this;
    if (!this.forgotPassword) {
      try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        this.appService.showLoader.next(false);
        if (res.user) {
          if (res.user && res.user.emailVerified) {
            const token = await res.user.getIdToken();
            this.userDetails.id = res.user.uid;
            this.userDetails.email = email;
            localStorage.setItem('authToken', token);
            localStorage.setItem('mahjongUserData', JSON.stringify(res.user));
            this.router.navigate(['/home']);
          } else {
            this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_EMAIL_NOT_VERIFIED, MESSAGE_TYPE.ERROR), 'danger');
          }
        }
      } catch (err) {
        this.appService.showLoader.next(false);
        console.dir(err);
        // if(err.code && err.code == 'auth/user-not-found') {
        this.appService.presentToast(err.message, 'danger');
        // }
      }
    } else {
      this.afAuth.auth.sendPasswordResetEmail(email).then(
        () => {
          this.forgotPassword = false;
          this.appService.showLoader.next(false);
          this.appService.presentToast(this.appService.getAppMessage(SUCCESS_MESSAGE.SUCC_FORGOT_PASS_LINK_SENT,
            MESSAGE_TYPE.SUCCESS), 'success');
        },
        err => {
          this.forgotPassword = false;
          this.appService.showLoader.next(false);
          this.appService.presentToast(err, 'danger');
        }
      );
    }
  }
}
