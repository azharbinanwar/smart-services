import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.page.html',
  styleUrls: ['./send-request.page.scss'],
})
export class SendRequestPage implements OnInit {
  postData;
  sendRequestForm: FormGroup;
  deliverTimeNumber: Array<string> = [];
  deliverTimeUnit: Array<string> = [];
  availableTimeNumber: Array<string> = [];
  availableTimeUnit: Array<string> = [];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private sharedService: SharedService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.postData = this.navParams.get("postData")
    this.availableTimeNumber = [
      '1', '2', '3', '4', '5',
      '6', '7', '8', '9', '10',
      '11', '12'
    ];
    this.availableTimeUnit = ['am', 'pm']

    this.deliverTimeNumber = [
      '1', '2', '3', '4', '5',
      '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15',
      '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25',
      '26', '72', '28', '29', '30',
    ];
    this.deliverTimeUnit = ['hours', 'days']
    this.sendRequestForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      // subCategory: new FormControl('', Validators.compose([
      //   Validators.maxLength(40),
      //   Validators.minLength(3),
      //   Validators.required
      // ])),
      description: new FormControl('', Validators.compose([
        Validators.maxLength(500),
        Validators.minLength(200),
        Validators.required
      ])),
      // serviceName: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{3,5}'),

      ])),
      available24Hour: new FormControl(false, Validators.required),
      jobTimeNumber: new FormControl('6', Validators.required),
      jobTimeUnit: new FormControl('hours', Validators.required),
      availableStartTime: new FormControl('8'),
      availableStartTimeUnit: new FormControl('am'),
      availableEndTime: new FormControl('5'),
      availableEndTimeUnit: new FormControl('pm'),
      // terms: new FormControl(true, Validators.pattern('true'))
    });

  }

  sendRequest(data) {
    this.presentLoading();
    setTimeout(() => {
      this.dismissModel();
    }, 3000);
    this.sharedService.sendRequestOnPost(this.postData.postID, data, this.authService.currentUserUID);

  }
  modalControllerDismissed () {
    this.modalController.dismiss();
  }
  dismissModel(){
    this.loadingController.dismiss();
    this.modalController.dismiss();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Sending Request...',
      spinner: 'lines'
    });
    await loading.present();

  }
}
