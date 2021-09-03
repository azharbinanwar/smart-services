import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPostsPageRoutingModule } from './my-posts-routing.module';

import { MyPostsPage } from './my-posts.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyPostsPageRoutingModule
  ],
  declarations: [MyPostsPage]
})
export class MyPostsPageModule {}
