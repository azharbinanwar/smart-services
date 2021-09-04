import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.page.html',
  styleUrls: ['./image-preview.page.scss'],
})
export class ImagePreviewPage implements OnInit {

  imageURL: any;
  name: string;
  sliderOption = {
    zoom: {
      maxRatio: 3
    },
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    

  };
  constructor(
    private navPramas: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.imageURL = this.navPramas.get('image');
    this.name = this.navPramas.get('name');
    console.log(this.imageURL);
    
  }
  close(){
    this.modalController.dismiss();
  }
}
