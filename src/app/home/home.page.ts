import { Component, OnInit, } from '@angular/core';
import { SettingsConfigService } from '../services/settings-config.service';
import { Commons } from '../modals/model/commons';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThemeService } from '../services/theme.service';
import { SharedService } from '../services/shared.service';
import { ModalController, PopoverController, MenuController } from '@ionic/angular';
import { AuthPage } from '../modals/auth/auth.page';
import { OptFavouriteComponent } from '../modals/components/opt-favourite/opt-favourite.component';
import { CreatePostPage } from '../post/create-post/create-post.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  signInPasswordBoolean;
  favouriteUserList: any;
  toHideBool = false;
  favouriteList = { icon: 'assets/icon/heart-empty.svg', hintLine: 'Nothing yet added to your favourite', routingLink: '/all-services' }
  allPosts: any;
  sliderConfig = {
    spaceBetween: 0,
    // centeredSlides: true,
    slidesPerView: 3
  };
  constructor(
    public settingsConfigService: SettingsConfigService,
    public commons: Commons,
    public authService: AuthService,
    public fireAuth: AngularFireAuth,
    public themeService: ThemeService,
    private sharedService: SharedService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private menuController: MenuController
  ) {
    this.authService.setCurrentUser();
    // this.userFavouriteList = this.authService.userFavourite;
    console.log(authService.userFavourite);


  }
  ngOnInit() {
    this.menuController.enable(true);
    this.sharedService.getAllPosts().subscribe((posts: any) => {
      this.allPosts = posts;
      console.log(this.allPosts);
    })
    setInterval(()=>{
      this.toHideBool = true;
    }, 2000)
  }

  async postAJob() {
    let modal;
    if(this.fireAuth.auth.currentUser != null){
      modal = await this.modalController.create({
        component: CreatePostPage,
        componentProps: {}
      });
    }else{
      modal = await this.modalController.create({
        component: AuthPage,
        componentProps: {}
      });

    }
    await modal.present();
  }
  async favouriteCardPopover (ev: Event, userUID: string, userName: string, userProfileImg: string) {
    
    let receiverData = {
      receiverUID: userUID,
      receiverName: userName,
      receiverProfileURL: userProfileImg
    }
    console.log("favouriteCardPopover", receiverData);

    const popover = await this.popoverController.create({
      component: OptFavouriteComponent,
      event: ev,
      mode: 'ios',
      animated: true,
      translucent: false,
      componentProps: {
        receiverData
        }
    });
  
    await popover.present();
  }
}




