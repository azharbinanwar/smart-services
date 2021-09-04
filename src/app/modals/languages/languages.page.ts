import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { SettingsConfigService } from 'src/app/services/settings-config.service';


@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {

  checkboxValue = true;
  selectLang = 'en';
  constructor(
    public modalCtrl: ModalController,
    public settingsConfigService: SettingsConfigService,
    public toastController: ToastController,
  ) { 
  }


  selectLanguage (selectedLanguage: any) {
    console.log("selectedLanguage", selectedLanguage);
    this.settingsConfigService.setLanguage(selectedLanguage);
    this.presentToast(selectedLanguage)
    this.dismissLanguage();
  }
  ngOnInit() {
  }
  dismissLanguage(){
    this.modalCtrl.dismiss();
  }
  async presentToast(selectedValue) {
    console.log("Toast Color", this.settingsConfigService.selectedTheme.primaryColor);
    const toast = await this.toastController.create({
      message: selectedValue,
      duration: 2000,
      color: this.settingsConfigService.selectedTheme.primaryColor,
    });
    toast.present();
  }
  

}
