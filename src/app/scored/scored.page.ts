import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../shared/app.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { APP_LABELS } from '../shared/app.labels';

@Component({
  selector: 'app-scored',
  templateUrl: './scored.page.html',
  styleUrls: ['./scored.page.scss'],
})
export class ScoredPage implements OnInit, AfterViewInit {
  showScanner = false;
  loadScorePage = false;
  constructor(
    public appService: AppService,
    private router: Router,
    private httpClient: HttpClient,
    public alertController: AlertController) { }
  counter;
  interval;
  isSafari = false;
  appLabels = APP_LABELS;
  @ViewChild('videoPlayer', {static: false}) videoplayer: ElementRef;
  ngOnInit() {
    this.counter = this.appService.score.previousScore;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
      if (ua.indexOf('chrome') > -1) {
      } else {
        this.isSafari = true;
        this.presentAlertConfirm();
      }
    }
  }

  ngAfterViewInit() {
  }

  onCodeScanResult(code: any) {
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.appService.getAppLabels(this.appLabels.ASK_PERMISSION_AFTER_SCAN),
      mode: 'ios',
      buttons: [
         {
        text: this.appService.getAppLabels(this.appLabels.SKIP),
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.router.navigate(['/home']);
        }
      } ,
      {
          text: this.appService.getAppLabels(this.appLabels.CONTINUE),
          handler: () => {
            if (!this.loadScorePage) {
              this.videoplayer.nativeElement.src = this.appService.score.scannedScore.cardVideoUrl;
              this.videoplayer.nativeElement.play();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  scanCompleteHandler(event: any) {
    this.appService.showLoader.next(true);
    this.showScanner = false;
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/scanQRScodeApi?qrcode=' + event, {
      headers: new HttpHeaders().set('authorization', `Bearer ${ localStorage.getItem('authToken') }`)
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
        this.loadScorePage = false;
        this.appService.showLoader.next(false);
        if (this.isSafari) {
          this.presentAlertConfirm();
        }
      },
      (error) => { this.appService.presentToast(error.error, 'danger'); this.appService.showLoader.next(false); }
    );
  }

  vidEnded(): void {
    this.loadScorePage = true;
    if (this.isSafari) {
      this.videoplayer.nativeElement.src = '';
    }
    const value = this.appService.score.scannedScore.scoreValue;
    let step = 1;
    if (value < 1000) {
      step = value / 10;
    } else if (value > 1000 && value < 10000) {
      step = value / 100;
    } else if (value > 10000) {
      step = value / 1000;
    }
    this.interval = setInterval(() => {
      if (this.counter <=
        this.appService.score.totalScore) {
        this.counter = this.counter + step;
      }
    }, 1);
    if (this.counter === this.appService.score.totalScore) {
      clearInterval(this.interval);
    }
  }

  showTopPlayer(): void {
    this.appService.showLoader.next(true);
    this.router.navigate(['/scoreboard']);
  }

  showMyScore(): void {
    this.appService.showLoader.next(true);
    this.router.navigate(['/userhistory']);
  }
  getVideoSource(): string {
    return this.isSafari ? '' : this.appService.score.scannedScore.cardVideoUrl;
  }
}
