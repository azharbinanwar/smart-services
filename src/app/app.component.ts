import { Component } from '@angular/core';

import { Platform, ModalController, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsConfigService } from './services/settings-config.service';
// import { AuthPage } from './modals/auth/auth.page';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthPage } from './modals/auth/auth.page';
import { ThemeService } from './services/theme.service';
import { Router, Routes } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {


  public appPages;
  skeletonVar: string = 'skeleton';
  public appPagesWithLogin = [
    {
      title: 'Home',
      url: '/home',
      icon: "assets/icon/home.svg",
    },
    {
      title: 'All Services',
      url: '/all-services',
      icon: "assets/icon/services.svg",
    },
    {
      title: 'Profile',
      url: '/own-profile',
      icon: "assets/icon/person.svg",
    },
    {
      title: 'Messaging',
      url: '/chats-page',
      icon: "assets/icon/messaging.svg",
    },
    {
      title: 'My Posts',
      url: '/my-posts',
      icon: "assets/icon/posts.svg",
    },
    {
      title: 'Favourite',
      url: '/favourite',
      icon: "assets/icon/heart-empty.svg",
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: "assets/icon/contact-us.svg",
    },
    {
      title: 'Share',
      url: '/home',
      icon: "assets/icon/share.svg",
    },
    {
      title: 'Rate Us',
      url: '/home',
      icon: "assets/icon/rate-us.svg",
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: "assets/icon/about-us.svg",
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: "assets/icon/settings.svg",
    },
    {
      title: 'Sign Out',
      // url: '/sign-out',
      icon: "assets/icon/sign-out.svg",
    }
  ];
  public appPagesWithGuest = [
    {
      title: 'Home',
      url: '/home',
      icon: "assets/icon/home.svg",
    },
    {
      title: 'All Services',
      url: '/all-services',
      icon: "assets/icon/services.svg",
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: "assets/icon/contact-us.svg",
    },
    {
      title: 'Share',
      url: '/home',
      icon: "assets/icon/share.svg",
    },
    {
      title: 'Rate Us',
      url: '/home',
      icon: "assets/icon/rate-us.svg",
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: "assets/icon/about-us.svg",
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: "assets/icon/settings.svg",
    },
  ];
  // colorPrimary;
  // selectedLanguage: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    public settingsConfigService: SettingsConfigService,
    public authService: AuthService,
    public themeService: ThemeService,

    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,

    private navCtrl: NavController,
    private menuController: MenuController,
    private router: Router,
    private appVersion: AppVersion

  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.themeService.intializeTheme();
    this.settingsConfigService.setInitialSettings();
    this.setAppPages();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
    // this.authService.setCurrentUser();
  }
  setAppPages() {
    this.fireAuth.authState.subscribe(auth => {
      this.appPages = [];
      this.appPages = this.appPagesWithLogin;
      if (this.fireAuth.auth.currentUser != null) {
        this.skeletonVar = 'user';
        this.authService.setCurrentUser();
        this.appPages = [];
        this.appPages = this.appPagesWithLogin;
      } else {
        this.skeletonVar = '!user';
        this.appPages = [];
        this.appPages = this.appPagesWithGuest;
      }
      console.log("app pages", this.appPages);
      console.log("skeletonBoolean", this.skeletonVar);
      console.log("User", this.fireAuth.auth.currentUser);

    });


  }
  async openPage(page) {
    if (this.fireAuth.auth.currentUser == null && page == "authPage") {
      this.openAuthPage();
    } else if (this.fireAuth.auth.currentUser != null) {
      this.navCtrl.navigateRoot("/settings");
    }
  }
  async openAuthPage() {
    console.log("Open Login Page");
    let modal = await this.modalCtrl.create({
      component: AuthPage,
      componentProps: {
      }
    });
    return await modal.present();
  }

  async navigateUser() {
    this.menuController.toggle();
    if (await this.fireAuth.auth.currentUser == null) {
      this.openAuthPage();
    } else {
      this.router.navigate(['/own-profile']);
    }
    // this.menuController.toggle();
  }

  signOut() {
    this.menuController.toggle();
    // this.fireAuth.auth.signOut();
    this.authService.userSignOut();
    console.log("Sign Out");
    this.router.navigate(['/home']);
    this.appPages = [];
    this.appPages = this.appPagesWithGuest;
  }
  commonPages(title: string) {
    console.log("Commond", title);
    this.router.navigate(['/about-us']);

  }
  // share(){
  //   this.appVersion.getPackageName().then((val) => {
  //     this.socialSharing.share(
  //       this.config.appName,
  //       this.config.appName,
  //       "",
  //       "https://play.google.com/store/apps/details?id=com.ezpzsol.ezpzkidslearning"
  //     );
  //   });
  // }

}
