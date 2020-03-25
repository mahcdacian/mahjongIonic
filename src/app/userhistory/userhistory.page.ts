import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.page.html',
  styleUrls: ['./userhistory.page.scss'],
})
export class UserhistoryPage implements OnInit {
  userHistory = [];
  totalScore = 0;
  constructor(private httpClient: HttpClient, private appService: AppService) {
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/userHistoryApi', {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.appService.authToken }`)
    })
      .subscribe(
        (res) => {
          this.userHistory = [];
          /* tslint:disable:no-string-literal */
          if (res && res['countData']) {
            this.totalScore = res['totalScore'];
            this.userHistory = res['countData'];
          }
          /* tslint:enable:no-string-literal */
          this.appService.showLoader.next(false);
        },
        (err) => { this.appService.presentToast(err, 'danger'); this.appService.showLoader.next(false); }
      );
  }

  ngOnInit() {
  }

}
