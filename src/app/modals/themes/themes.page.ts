import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';
import { SettingsConfigService } from 'src/app/services/settings-config.service';




@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {
  themeList = [
    { name: 'Default', color: '#0277bd' },
    { name: 'Dark', color: '#212121' },
    { name: 'Extra', color: '#9C7160' },
    { name: 'Autumn', color: '#F78154' },
    { name: 'Sunny', color: '#FFAB40' },
    { name: 'Sky', color: '#025D63' },
  ]

  constructor(
    private modalCtrl: ModalController,
    public themeService: ThemeService,
    public setConf: SettingsConfigService,
  ) { }



  ngOnInit() {
  }

  changeTheme(name) {
    this.themeService.setTheme(name);
  }
  dismissCtrl() {
    this.modalCtrl.dismiss();
  }
}
