import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../shared/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { APP_LABELS } from '../shared/app.labels';

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
    public alertController: AlertController
  ) { }

  ngOnInit() {
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
    this.showScanner = true;
    if (navigator.userAgent.match('CriOS')) {
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
      (error) => { this.appService.presentToast(error.error, 'danger'); this.appService.showLoader.next(false); }
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

  deferredPrompt: any;
  showButton = false;
@HostListener('window:beforeinstallprompt', ['$event'])
onbeforeinstallprompt(e) {
  console.log(e);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  this.deferredPrompt = e;
  this.showButton = true;
}
addToHomeScreen() {
  if (!this.deferredPrompt) {
      return;
  }
  // hide our user interface that shows our A2HS button
  this.showButton = false;
  // Show the prompt
  this.deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  this.deferredPrompt.userChoice
  .then((choiceResult) => {
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }
  this.deferredPrompt = null;
});
}
}
