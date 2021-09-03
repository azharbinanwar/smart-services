import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  createPostForm: FormGroup;
  deliverTimeNumber: Array<string> = [];
  deliverTimeUnit: Array<string> = [];
  allServices: any;
  constructor(
    private modalController: ModalController,
    public sharedService: SharedService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.sharedService.getAllServices().subscribe((res: any) => {
      this.allServices = res;
      console.log("all services", res);
    });
    this.deliverTimeNumber = [
      '1', '2', '3', '4', '5', 
      '6', '7', '8', '9', '10', 
      '11', '12', '13', '14', '15', 
      '16', '17', '18', '19', '20', 
      '21', '22', '23', '24', '25', 
      '26', '72', '28', '29', '30', 
    ]
    this.deliverTimeUnit = [ 'hours', 'days']
    this.createPostForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      subCategory: new FormControl('', Validators.compose([
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.maxLength(500),
        Validators.minLength(200),
        Validators.required
      ])),
      serviceName: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{3,5}'),

      ])),
      jobTimeNumber: new FormControl('6', Validators.required),        
      jobTimeUnit: new FormControl('hours', Validators.required),        
      // terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  createAPost(data){
    this.presentLoading();
    setTimeout(() => {
      this.dismissModel();
    }, 3000);
    console.log(data);
    this.sharedService.postAJob(data, this.authService.currentUserUID)
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
      message: 'Posting job...',
      spinner: 'lines'
    });
    await loading.present();
  }

}
