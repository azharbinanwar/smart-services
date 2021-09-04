import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ActionSheetController, PopoverController, LoadingController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage, firestore } from 'firebase/app';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userIsSP: boolean = false;
  previouseService: string = '';
  user_skill_list: Array<string> = [];
  toRemoveSkill: Array<string> = [];
  user_CertificationFrom: string;
  user_SPDate: Date;
  user_Experience: string

  spinnerBoolean: boolean = false;

  user_skill: any;
  baseLocations: Array<string> = [];
  experienceList: any = [];
  // FORM
  userUpdateForm: FormGroup;
  userBecomeSP: FormGroup;
  public formBuilder: FormBuilder;
  allServices: any;
  // userPhoto;

  constructor(
    // SERVICES
    public authService: AuthService,
    public themeService: ThemeService,
    public sharedService: SharedService,
    // MODAL CONTROLLER
    private modalController: ModalController,
    private actionsheetCtrl: ActionSheetController,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    // FIREBASE
    public fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    // CAMREA OR GALLERY
    private camera: Camera,


  ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Updating profile...',
      spinner: 'lines'
    });
    await loading.present();
  }
  ngOnInit() {
    this.sharedService.getAllServices().subscribe((res: any) => {
      this.allServices = res;
    });
    // this.userPhoto = this.authService.userProfileImg;
    this.previouseService = this.authService.currentUserService;
    console.log("previouseService = this.authService.currentUserService;", this.previouseService);
    this.initializeUser();
    this.baseLocations = [
      "Township",
      "Johar Town",
      "Modal Town",
      "Collage Road"
    ];
    this.experienceList = [
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '5+ years'
    ]
    this.userUpdateForm = new FormGroup({
      user_Name: new FormControl(this.authService.currentUserName, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      user_PhoneNo: new FormControl(this.authService.currentUserPhoneNo, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{11}'),
        // Validators.minLength(11),
        // Validators.maxLength(11)
      ])),
      user_Description: new FormControl(this.authService.currentUserDescription, Validators.compose([
        Validators.minLength(150),
      ])),
      user_BaseLocation: new FormControl(this.authService.currentUserBaseLocation, Validators.required),
    });
    console.log("user service", this.authService.currentUserService, this.authService.currentUserExperience);

    this.userBecomeSP = new FormGroup({
      user_Service: new FormControl(this.previouseService, Validators.required),
      user_Experience: new FormControl(this.authService.currentUserExperience, Validators.required),
      user_CertificationFrom: new FormControl(this.authService.currentUserCertificationFrom, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.required
      ])),

    });
    this.user_skill_list = [];
    this.user_skill_list = this.authService.currentUserSkills;
    if (this.authService.currentUserType == 'Employee')
      this.userIsSP = true;
  }

  async initializeUser() {
    // // this.user_ProfileImg = this.authService.userProfileImg;
    // this.user_Name = this.authService.currentUserName;
    // this.user_Description = this.authService.currentUserDescription;
    // this.user_Email = this.authService.currentUserEmail;
    // this.user_PhoneNo = this.authService.currentUserPhoneNo;
    // this.user_BaseLocation = this.authService.currentUserBaseLocation;
  }
  async editProfileDismiss() {
    this.modalController.dismiss();
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
    // this.userPhoto = downloadURL;
    this.spinnerBoolean = false;
    return downloadURL;
  }

  dismissModel(){
    this.loadingController.dismiss();
    this.modalController.dismiss();
  }
  updateUserProfile(userProfile: any, userBecomeSP: any, skillList: Array<string>, userIsSP: boolean) {
    this.presentLoading();
    setTimeout(() => {
      this.dismissModel();
    }, 3000);
    if (userIsSP == false) {
      this.updateProfile(userProfile);
    } else {
      this.updateAndBecomeSP(userProfile, userBecomeSP, skillList, this.previouseService);
      // this.sharedService.updateService(this.previouseService, userBecomeSP.user_Service, this.authService.currentUserUID, this.authService.currentUserType);
    }

  }

  // UPDATE PROFILE FOR NORMAL USER
  updateProfile(userProfile: any) {
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userName: userProfile.user_Name });
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userDescription: userProfile.user_Description });
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userPhoneNo: userProfile.user_PhoneNo });
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userBaseLocation: userProfile.user_BaseLocation });
  }
  // UPDATE PROFILE FOR SERVICE PROVIDDER
  async updateAndBecomeSP(userProfile: any, userBecomeSP: any, skillList: Array<string>, previousService: string) {

    this.updateProfile(userProfile);
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userExperience: userBecomeSP.user_Experience });
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userCertificationFrom: userBecomeSP.user_CertificationFrom });
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userService: userBecomeSP.user_Service });

    // if(this.currentUserType == 'Client' || previousService == null){
    // }else if(previousService != userBecomeSP.user_Service){
    // this.sharedService.updateService(previousService, userBecomeSP.user_Service, this.authService.currentUserUID, this.authService.currentUserType);
    // }
    // first Remove Previous SKill
    this.allServices.forEach(service => {
      if(service.serviceName == userBecomeSP.user_Service)
      this.fireStore.doc(`services/${service.id}`).update({ joinedUsers: firestore.FieldValue.arrayUnion(this.authService.currentUserUID) });
      if(service.serviceName == previousService && previousService != userBecomeSP.user_Service)
      this.fireStore.doc(`services/${service.id}`).update({ joinedUsers: firestore.FieldValue.arrayRemove(this.authService.currentUserUID) });
    });
    

    let toRemoveSkill = this.authService.currentUserSkills
    toRemoveSkill.forEach(skillRemove => {
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSkills: firestore.FieldValue.arrayRemove(skillRemove) });
    });
    // update New Skill
    skillList.forEach(skill => {
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSkills: firestore.FieldValue.arrayUnion(skill) });
    });
    console.log("this.authService.currentUserType", this.authService.currentUserType);

    if (this.authService.currentUserType == 'Client') { // one time conditon when user become Client to Employee
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSPDate: new Date() });
    }
    let employee = 'Employee'
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userType: employee });
    // previousService = userBecomeSP.user_Service;
  }





















  /*   updateProfile1(userProfile: any) {
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userName: userProfile.user_Name });
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userDescription: userProfile.user_Description });
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userPhoneNo: userProfile.user_PhoneNo });
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userBaseLocation: userProfile.user_BaseLocation });
    }
  
    updateAndBecomeSP(userProfile: any, userBecomeSP: any, skillList: Array<string>) {
  
      console.log("length of input", skillList.length);
      
      // this.updateProfile(userProfile);
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userExperience: userBecomeSP.user_Experience });
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userService: userBecomeSP.user_Service });
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userCertificationFrom: userBecomeSP.user_CertificationFrom });
      // first Remove Previous SKill
      let toRemoveSkill = this.authService.currentUserSkills
      toRemoveSkill.forEach(skillRemove => {
        console.log("skill Remove", skillRemove, "length", this.user_skill_list.length);    
        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSkills: firestore.FieldValue.arrayRemove(skillRemove) });
      });
      // update New Skill
      skillList.forEach(skill => {
        console.log("For Each Update", skill);
        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSkills: firestore.FieldValue.arrayUnion(skill) });
      });
      console.log("this.authService.currentUserType", this.authService.currentUserType);
  
      if (this.authService.currentUserType == 'Client') {
        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userSPDate: new Date() });
      }
      let employee = 'employee'
      this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userType: employee });
  
    }
   */
  addSkill(skill: string) {
    if (skill.length > 1)
      this.user_skill_list.push(skill);
    this.user_skill = '';
  }
  removeSkill(skill: string): void {
    this.user_skill_list = this.user_skill_list.filter(item => item != skill);
  }
  userTypeChange() {
    this.userIsSP = !this.userIsSP;
  }
  changeService(service: string) {
    // console.log(service);
    // this.allServices.forEach(async serviceToGet => {
    //   if (serviceToGet.serviceName == service) {
    //     this.userServiceID = serviceToGet.id;
    //   }
    // });
    // console.log(this.userServiceID);
  }







  /*
  onSaveValue(selectedLocation) {
    console.log("Selected:", selectedLocation);
    // this.authService.i;
    this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userBaseLocation: selectedLocation });
  }
  user_name_bool = true;
  user_description_bool = true;
  user_phone_no_bool = true;
  user_description_bool = true;

  editSave(field: string, booleanVariable: boolean, value: any) {

    if (field == "userName") {
      console.log("Field", field, booleanVariable);
      this.user_name_bool = !booleanVariable;
      if (this.user_name_bool) {
        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userName: value.user_Name });
      }
    }
    if (field == "userPhoneNo") {
      console.log("Field", field);
      this.user_phone_no_bool = !booleanVariable;
      if (this.user_phone_no_bool) {
        console.log("userPhone nO", value.user_PhoneNo);

        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userPhoneNo: value.user_PhoneNo });
      }
    }
    if (field == "userDescription") {
      console.log("Field", value, booleanVariable);
      this.user_description_bool = !booleanVariable;
      if (this.user_description_bool) {
        console.log("userDescription", value, this.user_description_bool);

        this.fireStore.doc(`users/${this.authService.currentUserUID}`).update({ userDescription: value });
      }
    }
  }
  */


}
