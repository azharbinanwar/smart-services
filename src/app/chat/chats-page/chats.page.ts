import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chatsPage: any;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { 
    this.chatsPage = { icon: 'assets/icon/messaging.svg', hintLine: 'Nothing to display in Messaging', routingLink: '/all-services' }
  }
  usersInChat: any;
  ngOnInit() {
    // console.log('userchats', this.authService.userChats);
    this.authService.getUserInChat(this.authService.currentUserUID)
    .subscribe((usersInChat: any)=> {
      console.log(usersInChat);
      this.usersInChat = usersInChat;
    })
  }
  navigateToChat(userUID: string, userProfileImg: string, userName: string) {
    let receiver  = {
      receiverUID: userUID,
      receiverName: userName,
      receiverProfileURL: userProfileImg
    }
    let navigationExtras: NavigationExtras = {
      state: {
        receiverData: receiver
      }
    }
    console.log(navigationExtras);
    
    this.router.navigate(['chat-screen'], navigationExtras);    
  }

}
