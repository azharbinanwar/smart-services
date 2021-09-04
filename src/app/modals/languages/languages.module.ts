import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { LanguagesPage } from './languages.page';
// import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LanguagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    // TranslateModule,
    RouterModule.forChild(routes),
  
  ],
  declarations: [
    LanguagesPage
  ],
  entryComponents: [
    LanguagesPage,
  ]

  
})
export class LanguagesPageModule {}
