import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserhistoryPage } from './userhistory.page';

const routes: Routes = [
  {
    path: '',
    component: UserhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserhistoryPageRoutingModule {}
