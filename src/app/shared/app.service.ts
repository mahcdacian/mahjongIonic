import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserInformation, SELECTED_APP_LANGUAGE, MESSAGE_TYPE } from './app.model';
import { Subject } from 'rxjs';
import { ENGLISH_STRING, CHINESE_STRING,ENGLISHCHINESE_STRING } from './message.strings';
import { APP_LABELS_CH, APP_LABELS_EN , APP_LABELS_EN_CH} from './app.labels';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  user: UserInformation;
  authState = null;
  showLoader = new Subject<boolean>();
  selectedAppLanguage: SELECTED_APP_LANGUAGE;

  constructor(private toastController: ToastController) {
    this.selectedAppLanguage = SELECTED_APP_LANGUAGE.ENGLISHCHINESE;
  }

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

  getAppMessage(message: string, messageType: MESSAGE_TYPE) {
    if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISH) {
      if (messageType === MESSAGE_TYPE.ERROR) {
        return ENGLISH_STRING.ERROR_MESSAGE_EN[message];
      } else {
        return ENGLISH_STRING.SUCCESS_MESSAGE_EN[message];
      }
    } else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.CHINESE) {
      if (messageType === MESSAGE_TYPE.ERROR) {
        return CHINESE_STRING.ERROR_MESSAGE_CH[message];
      } else {
        return CHINESE_STRING.SUCCESS_MESSAGE_CH[message];
      }
    }else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISHCHINESE) {
      if (messageType === MESSAGE_TYPE.ERROR) {
        return ENGLISHCHINESE_STRING.ERROR_MESSAGE_EN[message];
      } else {
        return ENGLISHCHINESE_STRING.SUCCESS_MESSAGE_EN[message];
      }
    }
  }
  getAppLabels(label: string) {
    if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISH) {
      return APP_LABELS_EN[label];
    } else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.CHINESE) {
      return APP_LABELS_CH[label];
    }else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISHCHINESE) {
      return APP_LABELS_EN_CH[label];
    }
  }
}
