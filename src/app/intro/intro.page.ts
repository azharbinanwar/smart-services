import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { ThemesPage } from '../modals/themes/themes.page';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  introList: any;
  constructor(
    private menuController: MenuController
  ) { }


  ngOnInit() {
    this.menuController.enable(false);
    this.introList = [
      {
        image: 'assets/icon/intro/post_task_icon.png',
        heading: 'Post Your Task',
        sub_heading: 'Tell us what you need. It\'s free to Post'
      },
      {
        image: 'assets/icon/intro/review_offers_icon.png',
        heading: 'Review Offers',
        sub_heading: 'Receive offers from trusted service providers'
      },
      {
        image: 'assets/icon/intro/hire_icon.png',
        heading: 'Hire the right person',
        sub_heading: 'Choose the right person for your task'
      },
    ];
    console.log(this.introList);

  }

}
