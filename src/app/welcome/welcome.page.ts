import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit,OnChanges {
  slideOpts = {
    initialSlide: 0,
    speed: 500,
    mode: 'ios',
    pager: true
  };
  isLargeScreen = true;
  screenHeight: number;
  screenWidth: number;

  constructor() {
    this.getScreenSize();
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
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
  visitNow(): void {
    window.location.href = 'https://vitasoy-na.com';
  }
  watchNow(): void {
    window.location.href = 'https://vitasoy-na.com/media/';
  }
}
