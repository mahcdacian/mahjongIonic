import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.page.html',
  styleUrls: ['./add-to-home.page.scss'],
})
export class AddToHomePage implements OnInit {
  isSafari = false;
  constructor(public appService: AppService) { }

  ngOnInit() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
      if (ua.indexOf('chrome') > -1) {
      } else {
        this.isSafari = true;
      }
    }
  }

  close(): void {
    this.appService.actionAddToHomeModal.next('dismiss');
  }

}
