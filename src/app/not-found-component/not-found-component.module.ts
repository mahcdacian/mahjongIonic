import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFoundComponentPageRoutingModule } from './not-found-component-routing.module';

import { NotFoundComponentPage } from './not-found-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundComponentPageRoutingModule
  ],
  declarations: [NotFoundComponentPage]
})
export class NotFoundComponentPageModule {}
