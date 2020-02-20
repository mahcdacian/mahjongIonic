import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreboardPageRoutingModule } from './scoreboard-routing.module';

import { ScoreboardPage } from './scoreboard.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ScoreboardPage]
})
export class ScoreboardPageModule {}
