import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendRequestPage } from './send-request.page';

const routes: Routes = [
  {
    path: '',
    component: SendRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendRequestPageRoutingModule {}
