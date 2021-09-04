import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { ModalController } from '@ionic/angular';
import { AuthPage } from '../modals/auth/auth.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-one-services',
  templateUrl: './one-services.page.html',
  styleUrls: ['./one-services.page.scss'],
})
export class OneServicesPage implements OnInit {

  usersInSameService: any;
  service: string;
  serviceData: any;
  joinedUsers: Array<string> = [];
  serviceName: string;
  favouriteBool: boolean = false;
  serviceIcon: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
    private modalController: ModalController,
    public fireAuth: AngularFireAuth,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.service = params['id'];
      console.log(this.service);
    });

  }
  ngOnInit() {
    this.getServiceData();
    this.getUsersForService();
  }
  // SINGAL SERVICE DATA
  getServiceData() {
    this.sharedService.getServiceDataByName(this.service)
      .subscribe((res: any) => {
        console.log("data by name", res);
        this.serviceData = res;
        this.serviceIcon = this.serviceData[0].iconName;
        console.log("res", this.serviceData);
        this.serviceName = this.serviceData[0].serviceName;

        this.serviceData[0].joinedUsers.forEach(userID => {
          this.joinedUsers.push(userID);
        });

      });
  }
  getUsersForService() {
    this.sharedService.getUsersByServiceName(this.service)
      .subscribe((res: any) => {
        this.usersInSameService = res;
      });
  }

  navigateToProfile(employeeUID: string) {
    console.log("employee UID", employeeUID);
    if (this.fireAuth.auth.currentUser != null)
      this.router.navigate(['/view-profile/' + employeeUID]);
    if (this.fireAuth.auth.currentUser == null)
      this.openAuthModel();
  }
  async openAuthModel() {
    const modal = await this.modalController.create({
      component: AuthPage,
      componentProps: { value: 123 }
    });
    await modal.present();
  }

  // favBool = false;
  // heartType = 'assets/icon/heart-empty.svg'
  toggleFavorite(otherUserUID: string) {
    this.authService.toggleFavourite(otherUserUID);
  }

  // profileClick(buttonClick: string, userID: string) {
  //   console.log("data one service ", buttonClick, userID);

  //   if (buttonClick == 'heart') {
  //     this.authService.toggleFavourite(userID);
  //     console.log("if", buttonClick, userID);
  //   } else {
  //     this.navigateToProfile(userID)
  //     console.log("else", buttonClick, userID);
  //   }
  // }

}
