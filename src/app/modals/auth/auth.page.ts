import { Component, OnInit } from '@angular/core';
import { SettingsConfigService } from 'src/app/services/settings-config.service';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';

// MODEL
import { Commons } from '../model/commons';

// FIREBASE
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// SERVICES
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

// FROM
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../model/password.validator';
import { CurrentUser } from '../model/current-user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  // SHOW HIDE PASSWORD
  passwordInputType: string = "password";
  signInPasswordBoolean = true;
  signUpPasswordBoolean: boolean = true;
  signUpCPasswordBoolean: boolean = true;

  // AUTH SIGN UP
  // userProfileImg: string = "";
  // userName: string = "";
  // userEmail: string = "";
  // userPassword: string = "";
  // userCPassword: string = "";
  // userDateCreated: Date;
  // userPhoneNo: string = "";
  // userBaseLocation: string = "";
  // userDescription: string = "";
  // userService: string = "";
  // userPosts: [] = [];
  // userReviews: [] = [];
  // userOrders: [] = [];

  // userType: string; // EMPLOYE OR CLIENT
  // userSkills: Array<string> = [];
  // userCertificationFrom: string;
  // userSPDate: Date;
  // userExperience: string


  userSignInEmail: string = '';
  userSignInPassword: string = '';

  baseLocations: Array<string>;

  sign_up_form: FormGroup;
  sign_in_form: FormGroup;
  matching_passwords_group: FormGroup;


  private userProfileDoc: AngularFirestoreCollection<any>;
  constructor(
    // CONTROLLER
    private modalCtrl: ModalController,
    private toast: ToastController,
    private loadingController: LoadingController,
    // SERVICES
    public settingsConfigService: SettingsConfigService,
    private authService: AuthService,
    public themeService: ThemeService,
    // FIREBASE
    public fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,

    public commons: Commons,

    // FORM VALIDATIOR
    public formBuilder: FormBuilder,

  ) {
    this.userProfileDoc = this.fireStore.collection<any>(`users`);
  }

  ngOnInit() {
    this.baseLocations = [
      "Twonship",
      "Johar Town",
      "Modal Town",
      "Collage Road"
    ];

    this.matching_passwords_group = new FormGroup({
      userPassword: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      userCPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    }); // PASSWORD MATCH FORM

    // ALL FIELD FORM VALIDATION
    this.sign_up_form = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      userEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      userPhoneNo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{11}'),
      ])),
      userBaseLocation: new FormControl(this.baseLocations[0], Validators.required),
      // userBaseLocation: new FormControl('', Validators.required),
      terms: new FormControl(true, Validators.pattern('true'))
    });
    // ALL FIELD FORM VALIDATION
    this.sign_in_form = this.formBuilder.group({
      sign_in_user_email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      sign_in_user_password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    });
  }

  validation_messages = {
    'userName': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 3 characters long.' },
      { type: 'pattern', message: 'User name must contain only English letters.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    ],
    'userEmail': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'userPhoneNo': [
      { type: 'required', message: 'Phone number must contain 11 digits.' },
      { type: 'pattern', message: 'Invalid phone numbber.' }
      // { type: 'minlength', message: 'Phone Number must contain 11 letter.' },
      // { type: 'maxlength', message: 'Phone Number must contain 11 letter.' },
    ],
    'userCPassword': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'userPassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number and 8 to 25 letters o' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'userBaseLocation': [
      { type: 'required', message: 'User Base Location required is required.' },
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  async attemptSignIn(formValue) {

    this.presentLoading('Signing in...');

    this.fireAuth.auth.signInWithEmailAndPassword(formValue.sign_in_user_email, formValue.sign_in_user_password)
      .then((res) => {
        this.dismissmodalCtrl();
        this.authService.setCurrentUser();
        this.dismissloadingController();
        this.dismissloadingController();
      }) 
      .catch((error) => {
        this.presentToast(error.message);
        this.dismissloadingController();
      });
  }


  async attemptSignUp(value) {

    this.presentLoading('Registering user...');
    // console.log("Value", value);
    const userName = value.userName;
    const userEmail = value.userEmail;
    const userPhoneNo = value.userPhoneNo;
    const userBaseLocation = value.userBaseLocation;
    const userPassword = value.matching_passwords.userPassword

    const userProfileImg = '';
    const userDateCreated = new Date();
    const userDescription = '';
    const userType = 'Client';
    const userService = '';
    const userPosts: any[] = [];
    const userReviews: any[] = [];
    const userOrders: any[] = [];
    const userChats: any[] = [];
    const userSkills: any[] = [];
    const userBids: any[] = [];
    const userFavourite: any[] = [];
    const userIsFavouriteBy: any[] = [];
    const userSPDate = new Date();
    const userCertificationFrom = '';
    const userExperience = '';

    this.fireAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then((res: any) => {
        console.log("create user", res);
        this.fireAuth.authState.subscribe(async auth => {
          if (auth) {
            // const userUID = auth.uid;
            this.fireStore.doc(`users/${auth.uid}`).set({
              userUID: auth.uid,
              userProfileImg,
              userName,
              userEmail,
              userDateCreated,
              userPhoneNo,
              userType,
              userService,
              userBaseLocation,
              userDescription,
              userPosts: [],
              userReviews: [],
              userOrders: [],
              userSPDate,
              userBids: [],
              userIsFavouriteBy: [],
              userFavourite: [],
              userSkills: [],
              userChats: [],
              userCertificationFrom,
              userExperience,

            });
            this.dismissloadingController();
            this.dismissmodalCtrl()
          }
        });

      })
      .catch(async (error: any) => {
        console.log(error);
        this.presentToast(error.message)
        this.dismissloadingController();
      });

  }

  // SHOW HIDE PASSWORD 
  showHidePassword(inputFieldFrom) {
    console.log("showHideClick", inputFieldFrom);
    // this.inputFieldBoolean = true;
    if (inputFieldFrom == "signInPassword") {
      this.signInPasswordBoolean = !this.signInPasswordBoolean;
    }
    if (inputFieldFrom == "signUpPassword") {
      this.signUpPasswordBoolean = !this.signUpPasswordBoolean;
    }
    if (inputFieldFrom == "signUpConfirmPassword") {
      this.signUpCPasswordBoolean = !this.signUpCPasswordBoolean;
    }
  }

  // TOAST 
  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      keyboardClose: false,
      spinner: 'lines'
    });
    await loading.present();
  }

  async dismissloadingController() {
    console.log("Dismissed Loading Controller");
    this.loadingController.dismiss();
  }

  // DISMISSED MODEL CONTROL 
  dismissmodalCtrl() {
    console.log("Dismissed Modal Controller");
    this.modalCtrl.dismiss();
  }

}
