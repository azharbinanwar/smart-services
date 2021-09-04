import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatScreenPageRoutingModule } from './chat-screen-routing.module';

import { ChatScreenPage } from './chat-screen.page';
import {AutosizeModule} from 'ngx-autosize';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatScreenPageRoutingModule,
    AutosizeModule,
  ],
  declarations: [ChatScreenPage]
})
export class ChatScreenPageModule {}
