import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showScanner = false;
  qrCode: string;
  constructor(private appService: AppService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onCodeScanResult(code: any) {
    // this.appService.presentToast(code, 'medium');
  }

  showQRScanner(): void {
    this.showScanner = true;
  }

  scanCompleteHandler(event: any) {
    this.appService.showLoader.next(true);
    this.showScanner = false;
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/scanQRScodeApi?qrcode=' + event).subscribe(
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
}
