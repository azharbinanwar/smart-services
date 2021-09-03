import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { Routes, RouterModule } from '@angular/router';
import { ThemesPage } from '../../modals/themes/themes.page';
import { EditProfilePage } from './edit-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ThemesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,

    ],
  declarations: [EditProfilePage],
  entryComponents: [
    EditProfilePage
  ]
})
export class EditProfilePageModule {}
