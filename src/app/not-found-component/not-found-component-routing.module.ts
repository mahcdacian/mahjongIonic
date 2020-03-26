import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponentPage } from './not-found-component.page';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundComponentPageRoutingModule {}
