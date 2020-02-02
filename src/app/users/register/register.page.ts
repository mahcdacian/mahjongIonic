import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppService } from '../../shared/app.service';
import { UserInformation } from '../../shared/user.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_LABELS } from '../../shared/app.labels';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../shared/message.strings';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showTermsAndConditionView = false;
  userDetails: UserInformation = {
    firstName: '',
    lastName: '',
    mobileNumber: undefined,
    address: '',
    id: '',
    email: ''
  };

  email = '';
  password = '';
  confirmPassword = '';

  appLabels = APP_LABELS;
  errorMessage: ERROR_MESSAGE;

  constructor(
    private afAuth: AngularFireAuth,
    private appService: AppService,
    private router: Router,
    private afStore: AngularFirestore
  ) { }

  ngOnInit() { }

  switchToTermsAndConditionView(): void {
    if (!this.validate()) {
      this.appService.presentToast(this.errorMessage, 'danger');
      return;
    }
    this.showTermsAndConditionView = true;
  }

  async register() {
    this.appService.showLoader.next(true);
    this.email = this.userDetails.email;
    const { email, password, confirmPassword } = this;
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.appService.showLoader.next(false);
      if (res.user) {
        this.userDetails.id = res.user.uid;
        this.afStore.doc(`registerUsersData/${res.user.uid}`).set(
          this.userDetails
        );
        res.user.sendEmailVerification().then(() => {
          this.appService.presentToast(SUCCESS_MESSAGE.SUCSS_REGISTER_SUCCESSFUL, 'success');
          this.router.navigate(['/users/login']);
        });
      }
    } catch (err) {
      this.appService.showLoader.next(false);
      console.dir(err);
      // if(err.code && err.code == 'auth/user-not-found') {
      this.appService.presentToast(err.message, 'danger');
      // }
    }
  }

  validate(): boolean {
    if (!this.userDetails.firstName || this.userDetails.firstName === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_FIRSTNAME_REQUIRED;
      return false;
    }
    if (this.userDetails.firstName.toString().length >= 16) {
      this.errorMessage = ERROR_MESSAGE.ERR_FIRSTNAME_LENGTH_EXCEEDS;
      return false;
    }
    if (!this.userDetails.lastName || this.userDetails.lastName === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_LASTNAME_REQUIRED;
      return false;
    }
    if (this.userDetails.lastName.toString().length >= 16) {
      this.errorMessage = ERROR_MESSAGE.ERR_LASTNAME_LENGTH_EXCEEDS;
      return false;
    }
    if (!this.userDetails.email || this.userDetails.email === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_EMAIL_REQUIRED;
      return false;
    }
    this.validateEmail();
    if (!this.userDetails.address || this.userDetails.address === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_ADDRESS_REQUIRED;
      return false;
    }
    if (this.userDetails.address.toString().length >= 151) {
      this.errorMessage = ERROR_MESSAGE.ERR_ADDRESS_LENGTH_EXCEEDS;
      return false;
    }
    if (!this.userDetails.mobileNumber) {
      this.errorMessage = ERROR_MESSAGE.ERR_MOBILENUMBER_REQUIRED;
      return false;
    }
    if (!(this.userDetails.mobileNumber.toString().length <= 12  && this.userDetails.mobileNumber.toString().length >= 10)) {
      this.errorMessage = ERROR_MESSAGE.ERR_MOBILENUMBER_REQUIRED;
      return false;
    }
    if (!this.password || this.password === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_PASSWORD_REQUIRED;
      return false;
    }
    if (!this.confirmPassword || this.confirmPassword === '') {
      this.errorMessage = ERROR_MESSAGE.ERR_PASSWORD_REQUIRED;
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = ERROR_MESSAGE.ERR_PASSWORD_NOTMATCH;
      return false;
    }
    return true;
  }
  validateEmail(): boolean {
    const mailformat = `/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/`;
    if (this.userDetails.email.toString().match(mailformat)) {
      return true;
    }
    this.errorMessage = ERROR_MESSAGE.ERR_EMAIL_BAD_FORMAT;
    return false;
  }
}
