import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProfilePage } from './view-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProfilePageRoutingModule {}
