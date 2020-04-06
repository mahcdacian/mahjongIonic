import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../shared/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { APP_LABELS } from '../shared/app.labels';
import { AddToHomePage } from '../add-to-home/add-to-home.page';
import { ERROR_MESSAGE } from '../shared/message.strings';
import { MESSAGE_TYPE } from '../shared/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showScanner = false;
  qrCode: string;
  appLabels = APP_LABELS;
  constructor(
    private appService: AppService,
    private httpClient: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    public alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.showAddToHomePrompt();
    this.appService.actionAddToHomeModal.subscribe(
      (res) => {
        this.dismiss();
      }
    );
  }

  onCodeScanResult(code: any) {
    // this.appService.presentToast(code, 'medium');
  }

  async presentNoScannerDialog() {
    const alert = await this.alertController.create({
      header: this.appService.getAppLabels(this.appLabels.ACTION_NOT_SUPPORTED),
      subHeader: this.appService.getAppLabels(this.appLabels.QR_SCANNER_INVALID_HEADER),
      message: this.appService.getAppLabels(this.appLabels.QR_SCANNER_INVALID_LABEL),
      mode: 'ios',
      buttons: [
        {
          text: this.appService.getAppLabels(this.appLabels.CLOSE),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.showScanner = false;
          }
        }
      ]
    });

    await alert.present();
  }

  showQRScanner(): void {
    let camPermission = false;
    try {
      const hasNavigator = typeof navigator !== 'undefined';
      const isMediaDevicesSuported = hasNavigator && !!navigator.mediaDevices;
      if (!isMediaDevicesSuported) {
        camPermission = true;
      }
    } catch (err) { }
    this.showScanner = true;
    if (camPermission) {
      this.presentNoScannerDialog();
    }
  }

  scanCompleteHandler(event: any) {
    this.appService.showLoader.next(true);
    this.showScanner = false;
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/scanQRScodeApi?qrcode=' + event, {
      headers: new HttpHeaders().set('authorization', `Bearer ${localStorage.getItem('authToken')}`)
    }).subscribe(
      (res) => {
        if (res) {
          /* tslint:disable:no-string-literal */
          this.appService.score = {
            totalScore: res['totalScore'],
            previousScore: res['prevScore'],
            scannedScore: {
              scoreValue: res['scoreCard'].score,
              cardUrl: res['scoreCard'].cardUrl,
              cardVideoUrl: res['scoreCard'].cardVideoUrl,
              cardName: res['scoreCard'].cardName,
              scoreRank: res['scoreCard'].scoreRank
            }
          };
          /* tslint:enable:no-string-literal */
        }
        this.router.navigate(['/scored']);
        this.appService.showLoader.next(false);
      },
      (error) => { 
        this.appService.showLoader.next(false); 
        if(error.error ==="Unauthorized"){
          this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
          'success');
          this.router.navigate(['/users/login']);
                    }else{
         this.appService.presentToast(error.error, 'danger'); 
        }
                    }
                   
    );
  }

  showTopPlayer(): void {
    this.appService.showLoader.next(true);
    this.router.navigate(['/scoreboard']);
  }

  onQREnter(qrCode: string) {
    if (qrCode.length === 8) {
      this.scanCompleteHandler(qrCode);
    }
  }

  showMyScore(): void {
    this.appService.showLoader.next(true);
    this.router.navigate(['/userhistory']);
  }

  async openAddToHomeModal() {
    const modal = await this.modalController.create({
      component: AddToHomePage
    });
    return await modal.present();
  }

  async dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async showAddedToHomeSuccessPrompt() {
    this.appService.showLoader.next(true);
    const alert = await this.alertController.create({
      header: this.appService.getAppLabels('CONGRATS_ADD_TO_HOME_SUCCESS_MSG'),
      buttons: ['OK']
    });
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/userAddToHomeApi', {
      headers: new HttpHeaders().set('authorization', `Bearer ${localStorage.getItem('authToken')}`)
    }).subscribe(
      (res) => {
        if (res) {
           alert.present();
        }
        this.appService.showLoader.next(false);
      },
      (error) => { 
        if(error.error ==="Unauthorized"){
          this.appService.showLoader.next(false); 
          this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
          'success');
          this.router.navigate(['/users/login']);
                    }else{
         this.appService.presentToast(error.error, 'danger'); }
           }
    );

    

    
  }

  showAddToHomePrompt(): void {
    if (this.isMobile()) {
      /* tslint:disable:no-string-literal */

      let isInStandaloneMode :Boolean=false; 
      try{
        if( ('standalone' in window.navigator) && (window.navigator['standalone']))
        isInStandaloneMode =true
     }catch(err){

     }
      try{
         if((window.matchMedia('(display-mode: standalone)').matches))
            isInStandaloneMode=true;
      }catch(err){

      }
      this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/getUserStatusApi', {
        headers: new HttpHeaders().set('authorization', `Bearer ${localStorage.getItem('authToken')}`)
      }).subscribe(
        (res) => {
          if (res) {
            /* tslint:disable:no-string-literal */
            if (isInStandaloneMode) {
              // credit api will be called from here for the first time.
              if (res['showAddedHomeSuccess']) {
                this.showAddedToHomeSuccessPrompt();
              }
            } else {
              if (res['showAddToHomePrompt']) {
                this.openAddToHomeModal();
              }
            }
            /* tslint:enable:no-string-literal */
          }
        },
        (error) => {
          if(error.error ==="Unauthorized"){
            this.appService.showLoader.next(false); 
            this.appService.presentToast(this.appService.getAppMessage(ERROR_MESSAGE.ERR_USER_NOT_LOGGED, MESSAGE_TYPE.ERROR),
            'success');
            this.router.navigate(['/users/login']);
                      }else{
           this.appService.presentToast(error.error, 'danger'); }
                  }
      );
    }
  }

  async logout() {
    this.appService.showLoader.next(true);
    try {
      await this.afAuth.auth.signOut();
      localStorage.clear();
      this.appService.showLoader.next(false);
      this.router.navigate(['/welcome']);
    } catch (e) {
      this.appService.presentToast(e, 'danger');
      this.appService.showLoader.next(false);
    }
  }

  isMobile(): boolean {
    let isMobile = false;
    // tslint:disable-next-line:max-line-length
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
      isMobile = true;
    }
    return isMobile;
  }
}
