import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  favouriteUserList: any;
  favouritePage: any;
  constructor(
    private sharedService: SharedService,
    public authService: AuthService,
  ) {
    this.favouritePage = { icon: 'assets/icon/heart-empty.svg', hintLine: 'Nothing yet added to your favourite', routingLink: '/all-services' }
  }

  ngOnInit() {
    
    // if (this.authService.userFavourite.length > 0) {
    //   this.favouriteUserList = [];
    //   this.authService.getFavouriteList(this.authService.userFavourite).subscribe((favouriteUserList: any) => {
    //     this.favouriteUserList = favouriteUserList;
    //   });
    // }
  }

  toggleFavorite(otherUserUID: string) {
    this.authService.toggleFavourite(otherUserUID);
  }
}
