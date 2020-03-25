import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowtoplayPage } from './howtoplay.page';

const routes: Routes = [
  {
    path: '',
    component: HowtoplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowtoplayPageRoutingModule {}
