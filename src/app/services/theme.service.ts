import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

const themes = {
  Default: {
    primary: '#0277bd',
    secondary: '#004c8c',
    tertiary: '#7044ff',
    light: '#f4f5f8',
    medium: '#f4f5f8',
    dark: '#222428'
  },
  Autumn: {
    primary: '#F78154',
    secondary: '#bf5229',
    tertiary: '#B4436C',
    light: '#F7D1C0',
    medium: '#E2BB91',
    dark: '#9B6C3B'
  },
  Dark: {
    primary: '#212121',
    secondary: '#191919',
    tertiary: '#FE5F55',
    light: '#445760',
    medium: '#343F49',
    dark: '#F7F7FF'
  },
  Extra: {
    primary: '#BA8D78',
    secondary: '#9C7160',
    tertiary: '#FF5E79',
    light: '#EDD5B7',
    medium: '#C19E82',
    dark: '#4F2F27'
  },
  Sunny: {
    primary: '#FFAB40',
    secondary: '#C77C02',
    tertiary: '#6a64ff',
    light: '#FFDFB7',
    medium: '#B29C80',
    dark: '#7F6F5B'
  },
  Sky: {
    primary: '#025D63',
    secondary: '#02373B',
    tertiary: '#FE5F55',
    light: "#69BDC6",
    medium: '#449099',
    dark: '#173033'
  }

};


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  primary: string;
  secondary: string;
  tertiary: string;
  light: string;
  medium: string;
  dark: string;

  appTheme: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage,
    private statusBar: StatusBar,
  ) { }
  intializeTheme() {
    this.storage.get('theme').then(name => {
      if (name) {
        this.setTheme(name);
      } else {
        this.setTheme('Default');
      }
      console.log("App Theme", name);
    });
  }
  setTheme(name: string) {
    const cssText = CSSTextGenerator(themes[name]);
    this.setGlobalCSS(cssText);

    this.appTheme = name;
    this.setColorHexs(themes[name]);
    this.statusBar.backgroundColorByHexString(themes[name].secondary);
    if (name == "Light") {
      this.statusBar.styleDefault();
    } else {
      this.statusBar.styleLightContent();
    }
    this.storage.set('theme', name);  
  }
  setColorHexs(themes) {
    if (themes.primary == "#f4f5f8") {
      this.primary = themes.medium;
      this.light = "#D8D8D8";
    } else {
      this.primary = themes.primary;
      this.light = themes.light;
    }

    this.secondary = themes.secondary;
    this.tertiary = themes.tertiary;
    this.dark = themes.dark;
    this.medium = themes.medium;
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  // get storedTheme() {
  //   return this.storage.get('theme');
  // }
}

const defaults = {
  primary: '#0277bd',
  secondary: '#004c8c',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  light: '#f4f5f8',
  medium: '#f4f5f8',
  dark: '#222428',
};

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${dark};
    --ion-background-color: ${light};
    --ion-text-color: ${dark};
    --ion-toolbar-background-color: ${contrast(light, 0.1)};
    --ion-toolbar-text-color: ${contrast(dark, 0.1)};
    --ion-item-background-color: ${contrast(light, 0.3)};
    --ion-item-text-color: ${contrast(dark, 0.3)};

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: 255,255,255;
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: 12,209,232;
    --ion-color-secondary-contrast: ${contrast(secondary)};
    --ion-color-secondary-contrast-rgb: 255,255,255;
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: 112,68,255;
    --ion-color-tertiary-contrast: ${contrast(tertiary)};
    --ion-color-tertiary-contrast-rgb: 255,255,255;
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};

    --ion-color-success: ${primary};
    --ion-color-success-rgb: 16,220,96;
    --ion-color-success-contrast: ${contrast(primary)};
    --ion-color-success-contrast-rgb: 255,255,255;
    --ion-color-success-shade: ${Color(primary).darken(shadeRatio)};
    --ion-color-success-tint: ${Color(primary).lighten(tintRatio)};

    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: 255,206,0;
    --ion-color-warning-contrast: ${contrast(warning)};
    --ion-color-warning-contrast-rgb: 255,255,255;
    --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
    --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};

    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: 245,61,61;
    --ion-color-danger-contrast: ${contrast(danger)};
    --ion-color-danger-contrast-rgb: 255,255,255;
    --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
    --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};

    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: 34,34,34;
    --ion-color-dark-contrast: ${contrast(dark)};
    --ion-color-dark-contrast-rgb: 255,255,255;
    --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
    --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};

    --ion-color-medium: ${medium};
    --ion-color-medium-rgb: 152,154,162;
    --ion-color-medium-contrast: ${contrast(medium)};
    --ion-color-medium-contrast-rgb: 255,255,255;
    --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
    --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};

    --ion-color-light: ${light};
    --ion-color-light-rgb: 244,244,244;
    --ion-color-light-contrast: $${contrast(light)};
    --ion-color-light-contrast-rgb: 0,0,0;
    --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
    --ion-color-light-tint: ${Color(light).lighten(tintRatio)};`;
}

function contrast(color, ratio = 0.8) {
  if (
    // color == '#F78154' ||
    color == '#212121' ||
    // color == '#f4f5f8' ||
    color == '#2A2B2E' ||
    color == '#025D63' || color == '#0277bd'
  ) {
    ratio = 10
  }
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
