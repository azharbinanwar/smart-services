import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.page.html',
  styleUrls: ['./view-request.page.scss'],
})
export class ViewRequestPage implements OnInit {
  data: any;
  employeeUID: string = null;
  
private bidID: string = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.bidID = params['id'];
      console.log("bid ID", this.bidID);
      this.sharedService.getABidforPost(this.bidID).subscribe((data: any)=> {
        console.log(data);
        this.data = data;
        this.employeeUID = data.UID;
        
      })
    });
  }

  // navigateToChat() {
  //   let receiverData = {
  //     receiverUID: this.employeeUID,
  //     receiverName: this.userName,
  //     receiverProfileURL: this.userProfileImg
  //   }
  //   let navigationExtra: NavigationExtras = {
  //     state: {
  //       receiverData: receiverData
  //     }
  //   }
  //   console.log("receiverData", receiverData);

  //   this.router.navigate(['chat-screen'], navigationExtra);
  // }

}
