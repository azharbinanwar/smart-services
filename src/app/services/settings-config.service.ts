import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';


const SELECTED_LANGUAGE_KEY = 'SELECTED_LANGUAGE_KEY'
const SELECTED_THEME_KEY = 'SELECTED_THEME_KEY'
const LANGUAGE_CODE_EN = "en";
const LANGUAGE_CODE_UR = "ur";
const THEME_DEFAULT = "Default";
const THEME_LIGHT = "Light";
const THEME_DARK = "Dark";
const THEME_BLUE = "Solarized Dark";



@Injectable({
  providedIn: 'root'
})

export class SettingsConfigService {

  selectedLanguage;
  selectedTheme;
  primaryColor: string;
  lightColor: string;
  contrastColor: string;
  actionBarContrast: string;
  checkboxColor: string;
  background: string;
  buttonColor: string;
  iconColor: string;
  hexCode: string

  settingItemsList = [
    {
      "name": "Language",
      "icon": "assets/icon/language.svg",
    },

    {
      "name": "Theme",
      "icon": "assets/icon/theme.svg",
    },

    {
      "name": "Privacy Policy",
      "icon": "assets/icon/privacy-policy.svg",
    },

    {
      "name": "Terms and Conditions",
      "icon": "assets/icon/terms-and-conditions.svg",
    },

    {
      "name": "Contact Us",
      "icon": "assets/icon/contact-us.svg",
    },

    {
      "name": "Share",
      "icon": "assets/icon/share.svg",
    },

    {
      "name": "About Us",
      "icon": "assets/icon/about-us.svg",
    },
  ];

  languagesList = [
    { "name": "English", "code": "en", "image": "./assets/flags/english.svg", "direction": "ltr" },
    { "name": "Urdu", "code": "ur", "image": "./assets/flags/urdu.svg", "direction": "rtl" }
  ];

  themeList = {
    "theme": [
      {
        "name": "Default",
        "image": "assets/themes/default-theme.svg",
        "colors": {
          "actionBar": "primary",
          "actionBarContrast": "light",
          "background": "light",
          "light": "light",
          "contrast": "dark",
          "checkbox": "primary",
          "button": "primary",
          "hrHex": "#1b88a6"
        },
        "iconColor": "dark",
      },
      {
        "name": "Light",
        "image": "assets/themes/light-theme.svg",
        "colors": {
          "actionBar": "light",
          "actionBarContrast": "dark",

          "background": "light",
          "light": "light",
          "bodyContrast": "dark",
          "checkbox": "primary",
          "button": "primary",
          "hrHex": "#5e6062"
        },
        "iconColor": "dark",
      },
      {
        "name": "Dark",
        "image": "assets/themes/dark-theme.svg",
        "colors": {
          "actionBar": "dark",
          "actionBarContrast": "light",
          "background": "dark-light",
          "light": "extra-dark-light",
          "bodyContrast": "light",
          "checkbox": "light",
          "button": "extra-dark-light",
          "hrHex": "#f4f5f8"
        },
        "iconColor": "light",

      },
      {
        "name": "Solarized Dark",
        "image": "./assets/themes/light-blue.svg",
        "colors": {
          "actionBar": "dark-blue",
          "actionBarContrast": "light",
          "background": "light-blue",
          "light": "extra-light-blue",
          "bodyContrast": "light",
          "checkbox": "light",
          "button": "extra-light-blue",
          "hrHex": "#f4f5f8"
        },
        "iconColor": "light",

      }

    ]
  };


  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private statusBar: StatusBar,
    private platform: Platform,
  ) {
    // THIS IS JUST TO RUN ONECE FOR AppComponent TO AVOID ERROR
    this.selectedTheme = this.themeList.theme[0];
  }

  setInitialSettings() {
    console.log("setInitialSettings");
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.getLanguage();
    // this.getTheme();
  }
  setLanguage(appLanguage) {
    if (appLanguage == LANGUAGE_CODE_UR) {
      this.translate.use(appLanguage);
      this.storage.set(SELECTED_LANGUAGE_KEY, this.languagesList[1]);
      this.platform.isRTL;
      this.selectedLanguage = this.languagesList[1];
    }
    else {
      this.translate.use(appLanguage);
      this.platform.isRTL;
      this.storage.set(SELECTED_LANGUAGE_KEY, this.languagesList[0]);
      this.selectedLanguage = this.languagesList[0];
    }
  }

  getLanguage() {
    this.storage.get(SELECTED_LANGUAGE_KEY).then(val => {
      if (val) {
        this.setLanguage(val.code);
      } else {
        this.selectedLanguage = this.languagesList[0];
      }
    });
  }

/*   getTheme() {
    this.storage.get(SELECTED_THEME_KEY).then(val => {
      if (val) {
        this.setTheme(val.name);
        this.setThemeVariable(val)
      } else {
        this.selectedTheme = this.themeList.theme[0];
        this.setThemeVariable(this.selectedTheme)
      }
    });
  }
  setTheme(appTheme: string) {
    console.log("appTheme", appTheme);

    if (appTheme == THEME_DARK) {
      console.log(THEME_DARK);
      this.setThemeVariable(this.themeList.theme[2])
      this.storage.set(SELECTED_THEME_KEY, this.themeList.theme[2])
      this.selectedTheme = this.themeList.theme[2];
    } else if (appTheme == THEME_LIGHT) {
      console.log(THEME_LIGHT);
      this.setThemeVariable(this.themeList.theme[1])
      this.storage.set(SELECTED_THEME_KEY, this.themeList.theme[1])
      this.selectedTheme = this.themeList.theme[1];
    } else if (appTheme == THEME_BLUE) {
      console.log(THEME_LIGHT);
      this.setThemeVariable(this.themeList.theme[3])
      this.storage.set(SELECTED_THEME_KEY, this.themeList.theme[3])
      this.selectedTheme = this.themeList.theme[3];
    } else {
      this.setThemeVariable(this.themeList.theme[0])
      this.storage.set(SELECTED_THEME_KEY, this.themeList.theme[0])
      this.selectedTheme = this.themeList.theme[0];
    }
  }

  setThemeVariable(selectedAppTheme) {
    console.log(selectedAppTheme);
    this.background = selectedAppTheme.colors.background;
    this.primaryColor = selectedAppTheme.colors.actionBar;
    this.actionBarContrast = selectedAppTheme.colors.actionBarContrast;
    this.lightColor = selectedAppTheme.colors.light;
    this.contrastColor = selectedAppTheme.colors.bodyContrast;
    this.checkboxColor = selectedAppTheme.colors.checkbox;
    this.buttonColor = selectedAppTheme.colors.button;
    this.iconColor = selectedAppTheme.iconColor;
    this.hexCode = selectedAppTheme.colors.hrHex;
    console.log("selectedAppTheme", selectedAppTheme.name);


    if (selectedAppTheme.name == "Default") {
      this.statusBar.backgroundColorByHexString('#02637e');
      this.statusBar.styleLightContent();
    } if (selectedAppTheme.name == "Light") {
      this.statusBar.backgroundColorByHexString('#f4f5f8');
      this.statusBar.styleDefault();
    } if (selectedAppTheme.name == "Dark") {
      this.statusBar.backgroundColorByHexString('#222428');
      this.statusBar.styleLightContent();
    } if (selectedAppTheme.name == "Solarized Dark") {
      this.statusBar.backgroundColorByHexString('#02373B');
      this.statusBar.styleLightContent();
    }
  }
 */


}
