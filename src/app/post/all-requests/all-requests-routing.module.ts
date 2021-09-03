import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllRequestsPage } from './all-requests.page';

const routes: Routes = [
  {
    path: '',
    component: AllRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllRequestsPageRoutingModule {}
