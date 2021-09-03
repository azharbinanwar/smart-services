import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AuthPage } from './auth.page';
// import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ],
  declarations: [
    AuthPage
  ],
  entryComponents: [
    AuthPage,
  ]

})
export class AuthPageModule {}
