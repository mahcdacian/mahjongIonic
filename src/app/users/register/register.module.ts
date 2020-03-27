import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { AddToHomePageModule } from '../../add-to-home/add-to-home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AddToHomePageModule
  ],
  declarations: [RegisterPage, TermsConditionComponent]
})
export class RegisterPageModule {}
