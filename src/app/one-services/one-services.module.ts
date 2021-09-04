import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OneServicesPageRoutingModule } from './one-services-routing.module';

import { OneServicesPage } from './one-services.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    OneServicesPageRoutingModule
  ],
  declarations: [OneServicesPage]
})
export class OneServicesPageModule {}
