import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showScanner = false;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  onCodeScanResult(code: any) {
    this.appService.presentToast(code, 'medium');
  }

  showQRScanner(): void {
    this.showScanner = true;
  }

  scanCompleteHandler(event: any) {
    this.showScanner = false;
    this.appService.presentToast('Code: ' + event, 'medium');
  }
}
