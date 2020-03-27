import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserInformation, SELECTED_APP_LANGUAGE, MESSAGE_TYPE, ScoreCard } from './app.model';
import { Subject } from 'rxjs';
import { ENGLISH_STRING, CHINESE_STRING, ENGLISH_CHINESE_STRING } from './message.strings';
import { APP_LABELS_CH, APP_LABELS_EN, APP_LABELS_EN_CH } from './app.labels';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  showLoader = new Subject<boolean>();
  selectedAppLanguage: SELECTED_APP_LANGUAGE;
  score: ScoreCard;

  constructor(private toastController: ToastController) {
    this.selectedAppLanguage = SELECTED_APP_LANGUAGE.ENGLISH_CHINESE;
  }

  actionAddToHomeModal = new Subject<string>();
  async presentToast(msg: any, toastType: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: toastType,
      keyboardClose: true,
      mode: 'ios',
      position: 'top',
      showCloseButton: true
    });
    toast.present();
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
    } else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISH_CHINESE) {
      if (messageType === MESSAGE_TYPE.ERROR) {
        return ENGLISH_CHINESE_STRING.ERROR_MESSAGE_EN_CH[message];
      } else {
        return ENGLISH_CHINESE_STRING.SUCCESS_MESSAGE_EN_CH[message];
      }
    }
  }
  getAppLabels(label: string) {
    if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISH) {
      return APP_LABELS_EN[label];
    } else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.CHINESE) {
      return APP_LABELS_CH[label];
    } else if (this.selectedAppLanguage === SELECTED_APP_LANGUAGE.ENGLISH_CHINESE) {
      return APP_LABELS_EN_CH[label];
    }
  }
}
