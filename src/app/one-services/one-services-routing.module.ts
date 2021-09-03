import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OneServicesPage } from './one-services.page';

const routes: Routes = [
  {
    path: '',
    component: OneServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneServicesPageRoutingModule {}
