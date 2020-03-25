import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowtoplayPageRoutingModule } from './howtoplay-routing.module';

import { HowtoplayPage } from './howtoplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowtoplayPageRoutingModule
  ],
  declarations: [HowtoplayPage]
})
export class HowtoplayPageModule {}
