import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { SendRequestPage } from '../send-request/send-request.page';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {

  postID: string = '';
  title: string = '';
  budget: string = '';
  dateCreated: number;
  description: string = '';

  employeeRequests: Array<string> = []
  jobTime: string = '';
  serviceName: string = '';
  subCategory: string = '';
  postUserUID: string = '';
  bidSent: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    public authService: AuthService,
    private modalController: ModalController,
    public fireAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.postID = params['id'];
      console.log("post ID", this.postID);
    });
    this.sharedService.getAPost(this.postID).subscribe((postData: any) => {
      this.title = postData.title;
      this.budget = postData.budget;
      this.dateCreated = postData.dateCreated.seconds * 1000;
      this.description = postData.description;
      this.employeeRequests = [];
      postData.employeeBids.forEach(bid => {
        this.employeeRequests.push(bid);
      });
      console.log("employeeRequests", this.authService.userBids);
      console.log("Comparing", this.authService.userBids.some(i => this.employeeRequests.includes(i)));
      this.bidSent = this.authService.userBids.some(i => this.employeeRequests.includes(i));
      console.log("employeeRequests", this.employeeRequests)
      this.jobTime = postData.jobTime;
      this.serviceName = postData.serviceName;
      this.subCategory = postData.subCategory;
      this.postUserUID = postData.UID;
      
      console.log(postData);
    });
  }
  async sendRequest() {

    const modal = await this.modalController.create({
      component: SendRequestPage,
      componentProps: {
        postData: {
          postID: this.postID,
          title: this.title,
          subCategory: this.subCategory,
          budget: this.budget,
          description: this.description
        }
      }
    });
    await modal.present();
  }
  veiwAllPost(postID: string) {
    console.log("Post ID", postID);
  }
}
