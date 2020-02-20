import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoredPageRoutingModule } from './scored-routing.module';

import { ScoredPage } from './scored.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoredPageRoutingModule,
    ZXingScannerModule,
    HttpClientModule
  ],
  declarations: [ScoredPage]
})
export class ScoredPageModule {}
