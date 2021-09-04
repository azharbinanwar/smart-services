import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-opt-favourite',
  templateUrl: './opt-favourite.component.html',
  styleUrls: ['./opt-favourite.component.scss'],
})
export class OptFavouriteComponent implements OnInit {

  receiverData: any;
  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams,
    private router: Router,
  ) { }

  ngOnInit() {
    this.receiverData = this.navParams.get('receiverData');
    console.log('this.navParams.get', this.navParams.get('receiverData'));
  }
  chat() {
    if (this.receiverData) {
      let navigationExtra: NavigationExtras = {
        state: {
          receiverData: this.receiverData
        }
      }
      console.log("receiverData", this.receiverData);
      this.router.navigate(['chat-screen'], navigationExtra);
    }
    this.popoverController.dismiss();
  }
  viewProfile() { 
    console.log('this.receiverData.receiverUID',this.receiverData.receiverUID);
    
    // this.router.navigate(['/view-profile', { id: this.receiverData.receiverUID }]);
    this.router.navigate(['/view-profile/' + this.receiverData.receiverUID]);
    this.popoverController.dismiss();
  }
}
