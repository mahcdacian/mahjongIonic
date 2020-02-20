import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoredPage } from './scored.page';

const routes: Routes = [
  {
    path: '',
    component: ScoredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoredPageRoutingModule {}
