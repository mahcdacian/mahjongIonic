import { Component, OnInit, HostListener, OnChanges } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit,OnChanges {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    mode: 'ios',
    pager: true
  };
  isLargeScreen = true;
  screenHeight: number;
  screenWidth: number;

  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 760) {
      this.isLargeScreen = false;
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getScreenSize();
  }

  redirect(): void {
    window.location.href = 'https://mobirise.co';
  }

}
