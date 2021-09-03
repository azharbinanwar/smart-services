import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllRequestsPageRoutingModule } from './all-requests-routing.module';

import { AllRequestsPage } from './all-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllRequestsPageRoutingModule
  ],
  declarations: [AllRequestsPage]
})
export class AllRequestsPageModule {}
