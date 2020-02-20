import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserhistoryPageRoutingModule } from './userhistory-routing.module';

import { UserhistoryPage } from './userhistory.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    UserhistoryPageRoutingModule
  ],
  declarations: [UserhistoryPage]
})
export class UserhistoryPageModule {}
