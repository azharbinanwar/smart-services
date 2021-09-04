import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnProfilePageRoutingModule } from './own-profile-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { OwnProfilePage } from './own-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnProfilePageRoutingModule,
    TranslateModule,
  ],
  declarations: [OwnProfilePage]
})
export class OwnProfilePageModule {}
