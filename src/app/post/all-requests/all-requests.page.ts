import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.page.html',
  styleUrls: ['./all-requests.page.scss'],
})
export class AllRequestsPage implements OnInit {

  private postID: string = null;
  public bidListForAPost: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.postID = params['id'];
      console.log("post ID", this.postID);
    });
    this.sharedService.getAllBidforAPost(this.postID).subscribe((data: any) => {
      console.log("bids", data);
      this.bidListForAPost = data;
      console.log("bidListForAPost", this.bidListForAPost);
    });

  }


}
