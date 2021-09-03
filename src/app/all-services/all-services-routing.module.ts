import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllServicesPage } from './all-services.page';

const routes: Routes = [
  {
    path: '',
    component: AllServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllServicesPageRoutingModule {}
