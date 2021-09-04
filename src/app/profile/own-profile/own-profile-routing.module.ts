import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnProfilePage } from './own-profile.page';


const routes: Routes = [
  {
    path: '',
    component: OwnProfilePage
  },
  // {
  //   path: 'edit-profile',
  //   loadChildren: () => import('./profile/own-profile.module').then( m => m.EditProfilePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnProfilePageRoutingModule {}
