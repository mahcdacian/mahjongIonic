import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-add-to-home',
  templateUrl: './add-to-home.page.html',
  styleUrls: ['./add-to-home.page.scss'],
})
export class AddToHomePage implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  close(): void {
    this.appService.actionAddToHomeModal.next('dismiss');
  }

  AddtoHome(): void {
    this.appService.actionAddToHomeModal.next('addToHome');
  }

}
