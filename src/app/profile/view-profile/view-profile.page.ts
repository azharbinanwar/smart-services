import { CallNumber } from '@ionic-native/call-number/ngx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController, Animation, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ImagePreviewPage } from 'src/app/modals/image-preview/image-preview.page';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  employeeUID: string;
  employeeProfile: any;

  userProfileImg: string;
  userDescription: string;
  userName: string;
  userEmail: string;
  userDateCreated: number;
  userPhoneNo: string;
  userExperience: string;
  userBaseLocation: string;
  userType: string;
  userCertificationFrom: string;
  userService: string;
  userSPDate: number;
  userPosts: Array<string> = [];
  userReviews: [];
  userOrders: [];
  userSkills: Array<string> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    public authService: AuthService,
    public themeService: ThemeService,
    private animationCtrl: AnimationController,
    private router: Router,
    private fireStore: AngularFirestore,
    private modalController: ModalController,
    private callNumber: CallNumber,
  ) {
  }

  heartType;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.employeeUID = params['id'];
      console.log("Employee UID", this.employeeUID);
    });

    this.heartType = this.authService.userFavourite.indexOf(this.employeeUID) != -1 ? "assets/icon/heart.svg" : "assets/icon/heart-empty.svg";
    console.log('heart type', this.heartType);
    this.authService.getUser(this.employeeUID).subscribe((employeeProfile: any) => {
      this.employeeProfile = employeeProfile;
      this.userProfileImg = employeeProfile.userProfileImg;
      this.userName = employeeProfile.userName;
      this.userDescription = employeeProfile.userDescription;
      this.userType = employeeProfile.userType;
      this.userEmail = this.employeeProfile.userEmail;
      this.userPhoneNo = employeeProfile.userPhoneNo;    
      this.userBaseLocation = employeeProfile.userBaseLocation;
      this.userDateCreated = employeeProfile.userDateCreated.seconds * 1000;
      this.userService = employeeProfile.userService;
      this.userExperience = employeeProfile.userExperience;
      this.userCertificationFrom = employeeProfile.userCertificationFrom;
      this.userSPDate = employeeProfile.userSPDate.seconds * 1000;
      employeeProfile.userPosts.forEach(post => {
        this.userPosts.push(post);
      })
      this.userSkills = [];

      employeeProfile.userSkills.forEach(skill => {
        this.userSkills.push(skill);

      });

    })
  }
  fabClicked: boolean = true;

  contactEmployee() {

    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelector('.i-fab-list'))
      .duration(300)
      .fromTo('transform', 'translateY(0px)', 'translateY(-200px)')
      .fromTo('opacity', '0', '1');
    const animation2: Animation = this.animationCtrl.create()
      .addElement(document.querySelector('.i-fab-list'))
      .duration(300)
      .fromTo('transform', 'translateY(-200px)', 'translateY(0px)')
      .fromTo('opacity', '1', '0');
    if (this.fabClicked == true)
      animation.play();
    if (this.fabClicked == false)
      animation2.play();
    console.log('animation.played')
    this.fabClicked = !this.fabClicked;
  }
  navigateToChat() {
    let receiverData = {
      receiverUID: this.employeeUID,
      receiverName: this.userName,
      receiverProfileURL: this.userProfileImg
    }
    let navigationExtra: NavigationExtras = {
      state: {
        receiverData: receiverData
      }
    }
    console.log("receiverData", receiverData);

    this.router.navigate(['chat-screen'], navigationExtra);
  }
  
  toggleFavorite() {
    console.log(this.employeeUID);
    this.authService.toggleFavourite(this.employeeUID)
  }

  async previewImage(userProfileImg) {
    const modal = await this.modalController.create({
      component: ImagePreviewPage,
      componentProps: {
        image: userProfileImg,
        name: this.userName
      }
    }).then(modal => modal.present());
  }
  callEmployee(userPhoneNo: string) {
    console.log(userPhoneNo);
    
    if(userPhoneNo != null ){
      this.callNumber.callNumber(userPhoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }

  }
}
