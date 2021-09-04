import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsPagePageRoutingModule } from './chats-routing.module';
import { ChatsPage } from './chats.page';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPagePageRoutingModule,
    SharedModule
  ],
  declarations: [ChatsPage]
})
export class ChatsPagePageModule {}
