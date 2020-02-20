import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scored',
  templateUrl: './scored.page.html',
  styleUrls: ['./scored.page.scss'],
})
export class ScoredPage implements OnInit, AfterViewInit {
  showScanner = false;
  loadScorePage = false;
  constructor(public appService: AppService, private router: Router, private httpClient: HttpClient) { }
  counter;
  interval;
  ngOnInit() {
    this.counter = this.appService.score.previousScore;
  }

  ngAfterViewInit() {
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
        this.loadScorePage = false;
        this.appService.showLoader.next(false);
      },
      (error) => { this.appService.presentToast(error.error, 'danger'); this.appService.showLoader.next(false); }
    );
  }

  vidEnded(): void {
    this.loadScorePage = true;
    this.interval = setInterval(() => {
      if (this.counter <=
        this.appService.score.totalScore) {
        this.counter++;
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
}
