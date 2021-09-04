import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendRequestPageRoutingModule } from './send-request-routing.module';

import { SendRequestPage } from './send-request.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    SendRequestPageRoutingModule
  ],
  declarations: [SendRequestPage]
})
export class SendRequestPageModule {}
