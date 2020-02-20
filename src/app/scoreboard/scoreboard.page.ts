import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {
  topUsers = [];
  currentUserRank = 0;
  currentUserName;
  currentUserScore = 0;
  constructor(private httpClient: HttpClient, private appService: AppService) {
    this.httpClient.get('https://us-central1-mahjong-c2571.cloudfunctions.net/topScorersAPi')
    .subscribe(
      (res) => {
        this.topUsers = [];
        /* tslint:disable:no-string-literal */
        if (res) {
          res['topUser'].forEach(element => {
            if (element.ranking <= 5) {
              this.topUsers.push(element);
            }
          });
          this.currentUserRank = res['currentUserrank'].ranking;
          this.currentUserName = res['currentUserrank'].name;
          this.currentUserScore = res['currentUserrank'].score;
        }
        /* tslint:enable:no-string-literal */
        this.appService.showLoader.next(false);
      },
      (err) => { this.appService.presentToast(err, 'danger'); this.appService.showLoader.next(false); }
    );
  }

  ngOnInit() {
  }

  showUserName(name: string) {
    // name = name + 'undefined undefined xundefined undefined undefined undefined';
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
  }
}
