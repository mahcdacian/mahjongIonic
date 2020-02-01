import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppService } from '../../shared/app.service';
import { UserInformation } from '../../shared/user.model';
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
    mobileNumber: 0,
    address: '',
    id: '',
    email: ''
  };
  email = '';
  password = '';

  appLables = APP_LABELS;

  constructor(
    private afAuth: AngularFireAuth,
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit() { }



  async login() {
    const { email, password } = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      if (res.user) {
        if (res.user && res.user.emailVerified) {
          this.userDetails.id = res.user.uid;
          this.userDetails.email = email;
          this.appService.authState = res.user;
          this.appService.setUser(this.userDetails);
          this.appService.presentToast(SUCCESS_MESSAGE.SUCC_REGISTER_LOGIN, 'success');
          this.router.navigate(['/home']);
        } else {
          this.appService.presentToast(ERROR_MESSAGE.ERR_EMAIL_NOT_VERIFIED, 'danger');
        }
      }
    } catch (err) {
      console.dir(err);
      // if(err.code && err.code == 'auth/user-not-found') {
      this.appService.presentToast(err.message, 'danger');
      // }
    }
  }
}
