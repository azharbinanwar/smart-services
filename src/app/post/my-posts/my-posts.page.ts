import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreatePostPage } from '../create-post/create-post.page';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.page.html',
  styleUrls: ['./my-posts.page.scss'],
})
export class MyPostsPage implements OnInit {
  myPostPage: any;
  myPostsList: any;
  postToggleListORSlide: boolean = true;
  sliderConfig = {
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1
  };

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.myPostPage = { icon: 'assets/icon/posts.svg', hintLine: 'No job is posted by You, Create a poste to view here', routingLink: '/all-services' }
    console.log(this.authService.currentUserPosts);
    if (this.authService.currentUserPosts.length > 0) {
      this.sharedService.getMyPostList(this.authService.currentUserPosts, this.authService.currentUserUID).subscribe((data: any) => {
        console.log("my posts", data);
        this.myPostsList = data;
      });
    }
  }

  async postAJob() {
    const modal = await this.modalController.create({
      component: CreatePostPage,
      componentProps: {}
    });
    await modal.present();
  }

  toggleListSlide() {
    this.postToggleListORSlide = !this.postToggleListORSlide;
    
    // if()
    // if (this.postToggleListORSlide == )
    //   this.postToggleListORSlide = 'assets/icon/list.svg';
    // else
    //   this.postToggleListORSlide = 'assets/icon/doc.svg';

  }

}
