import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagePreviewPage } from './image-preview.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagePreviewPageRoutingModule {}
