import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../shared/app.service';
import { ERROR_MESSAGE } from '../../../shared/message.strings';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent implements OnInit {
  @Output() termsaccepted = new EventEmitter();
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() { }

  accepted(): void {
    this.termsaccepted.emit('');
  }

  rejected(): void {
    this.appService.presentToast(ERROR_MESSAGE.ERR_ACCEPT_TERMS_AND_CONDITION, 'danger');
    this.router.navigate(['/welcome']);
  }
}
