import { Component, OnInit, } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, AlertController, ModalController, PopoverController, AnimationController, Animation } from '@ionic/angular';

// import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { storage } from 'firebase/app';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { SettingsConfigService } from 'src/app/services/settings-config.service';
import { CurrentUser } from 'src/app/modals/model/current-user';
import { AuthService } from 'src/app/services/auth.service';
import { ImagePreviewPage } from 'src/app/modals/image-preview/image-preview.page';

@Component({
  selector: 'app-profile',
  templateUrl: './own-profile.page.html',
  styleUrls: ['./own-profile.page.scss'],
})

export class OwnProfilePage implements OnInit {
  spinnerBoolean: boolean = false;
  // userPhoto;

  constructor(
    public settingsConfigService: SettingsConfigService,
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public currentUser: CurrentUser,
    public authService: AuthService,
    private camera: Camera,
    public themeService: ThemeService,

    private modalController: ModalController,
    private actionsheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private popoverController: PopoverController,
    private router: Router,
    private animationCtrl: AnimationController,
  ) {

    if (this.fireAuth.auth.currentUser == null) {
      this.router.navigate(['/home']);
      console.log("null user");
    }
  }
  animationOne;

  ngOnInit() {
    console.log("this.fireAuth.auth.currentUser", this.fireAuth.auth.currentUser);

    // this.userPhoto = this.authService.userProfileImg;
    // console.log("userPhoto", this.userPhoto);
    // console.log("this.authService.userProfileImg", this.authService.userProfileImg);
  }

  async userProfilePicture() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Choose',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.takePhotoByCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.takePhotoFromGallery();
        }
      }]
    });
    await actionSheet.present();
  }
  async takePhotoByCamera() {
    try {
      const options: CameraOptions = { // Camera Image PICK up
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300

      }

      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.spinnerBoolean = true;
      this.authService.userProfileImg = image;
      let imageURL = await this.uploadPicture(image);
      this.authService.userProfileImg = imageURL;
    } catch (e) {
      console.log("Error", e);
      this.spinnerBoolean = false;
    }

  }

  async takePhotoFromGallery() {
    try {

      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300
      }


      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.spinnerBoolean = true;
      this.authService.userProfileImg = image;
      let imageURL = await this.uploadPicture(image);
      this.authService.userProfileImg = imageURL;

    } catch (e) {
      this.spinnerBoolean = false;
    }

  }
  async uploadPicture(imageString) {
    // this.userPhoto = imageString;
    const storageRef = storage().ref(`userProfilesImages/${this.authService.currentUserUID}`);
    const uploadedPicture = await storageRef.putString(imageString, 'data_url');
    const downloadURL = await storageRef.getDownloadURL();
    this.fireStore.doc(`users/${this.authService.currentUserUID}`)
      .update({
        userProfileImg: downloadURL
      });
    this.spinnerBoolean = false;
    // this.userPhoto = downloadURL;
    // this.userPhoto = downloadURL;
    return downloadURL;
  }

  editUserName = 'edit'
  editUserNameBoolean: boolean = true;

  editInputField() {
    console.log('editField');

    this.editUserNameBoolean = !this.editUserNameBoolean;
    this.editUserName = 'assets/icon/save-editing.svg';
  }
  // async profileOpt1(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: ProfileOptComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();
  // }


  async profileOpt() {
  }

  async editProfile() {
    this.fabClicked = false;
    this.fabClick()
    let modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {}
    });
    return await modal.present();
  }

  fabClicked: boolean = true;

  fabClick() {

    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelector('.i-fab-list'))
      .duration(300)
      .fromTo('transform', 'translateY(0px)', 'translateY(-160px)')
      .fromTo('opacity', '0', '1');
    const animation2: Animation = this.animationCtrl.create()
      .addElement(document.querySelector('.i-fab-list'))
      .duration(300)
      .fromTo('transform', 'translateY(-160px)', 'translateY(0px)')
      .fromTo('opacity', '0', '1');
    if (this.fabClicked == true)
      animation.play();
    if (this.fabClicked == false)
      animation2.play();
    console.log('animation.played')
    this.fabClicked = !this.fabClicked;
  }



  async signOut() {
    this.fabClicked = false;
    this.fabClick()
    this.authService.userSignOut();
    this.router.navigate(['/home']);

  }

  async previewImage(userProfileImg) {
    const modal = await this.modalController.create({
      component: ImagePreviewPage,
      componentProps: {
        image: userProfileImg,
        name: this.authService.currentUserName
      }
    }).then(modal => modal.present());
  }

}
