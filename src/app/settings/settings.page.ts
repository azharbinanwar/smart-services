import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LanguagesPage } from '../modals/languages/languages.page';
import { SettingsConfigService } from '../services/settings-config.service';
import { AuthPage } from '../modals/auth/auth.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { ThemesPage } from '../modals/themes/themes.page';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public settingsConfigService: SettingsConfigService,
    public toastController: ToastController,
    public fireAuth: AngularFireAuth,
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
  ) {
    console.log("Settings Constructor");
  }

  ngOnInit() {
  }

  async openSettingItem(settingItem: string) {
    console.log("settingItem", settingItem);
    if (settingItem == this.settingsConfigService.settingItemsList[0].name) {
      let modal = await this.modalCtrl.create({
        component: LanguagesPage,
        componentProps: {}
      });
      return await modal.present();
    }
    else if (settingItem == this.settingsConfigService.settingItemsList[1].name) { // List is access form the Setting Service
      let modal = await this.modalCtrl.create({
        component: ThemesPage,
        componentProps: {}
      });
      return await modal.present();
    }
    else if (settingItem == "Sign Out") {
      await this.authService.userSignOut();
    }
    else if (settingItem == "About Us")
      this.router.navigate(["/about-us"]);
    else if (settingItem == "Contact Us")
      this.router.navigate(["/contact-us"]);
  }
  async openAuthPage() {
    console.log("Login Page");
    let modal = await this.modalCtrl.create({
      component: AuthPage,
      componentProps: {}
    });
    return await modal.present();
  }
  async navigateUser() {
    if (await this.fireAuth.auth.currentUser == null) {
      this.openAuthPage();
    } else {
      this.router.navigate(['/own-profile']);
    }
  }
}
