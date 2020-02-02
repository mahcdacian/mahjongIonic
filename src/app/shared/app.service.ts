import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserInformation } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  user: UserInformation;
  authState = null;
  showLoader = new Subject<boolean>();

  constructor(private toastController: ToastController) { }

  setUser(user: UserInformation) {
    this.user = user;
  }

  getUID(): string {
    return this.user.id;
  }

  async presentToast(msg: any, toastType: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: toastType,
      keyboardClose: true,
      mode: 'ios',
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

}
