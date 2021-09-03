import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { SharedService } from '../../services/shared.service';
import { IonContent, IonInput } from "@ionic/angular";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.page.html',
  styleUrls: ['./chat-screen.page.scss'],
})
export class ChatScreenPage implements OnInit {
  receiverUID: string;
  receiverData: any;
  previousChat: ChatMessage[] = [];
  hasPreviousChat: boolean = false;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('inputMessage', {  static: false })  inputElement: IonInput;
  constructor(
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private chatService: ChatService,
    private sharedService: SharedService,
    private router: Router,
    public themeService: ThemeService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.receiverData = this.router.getCurrentNavigation().extras.state.receiverData;
        console.log("employeeData", this.receiverData);
      }
    })

  }
  chatID: string = '';
  ionViewDidEnter() {
    this.scrollToBottom();
  }
  ngOnInit() {
    this.scrollToBottom();

    if (this.receiverData.receiverUID > this.authService.currentUserUID) {
      this.chatID = this.receiverData.receiverUID + this.authService.currentUserUID;
    }
    if (this.receiverData.receiverUID < this.authService.currentUserUID) {
      this.chatID = this.authService.currentUserUID + this.receiverData.receiverUID;
    }
    this.chatService.getPreviousChat(this.chatID)
      .subscribe((res: any) => {
        if (res == null || res == 'undefined') {
          this.hasPreviousChat = false;
        } else {
          this.previousChat = [];
          res.chatMessage.forEach(chat => {
            this.previousChat.push(chat);

          })
          this.hasPreviousChat = true;
        }
      });

  }
  message: string;
  sendMessage(message: string) {
    // let message = 'How are you'
    console.log("Send message");
    this.chatService.sendMessage(
      this.chatID, this.authService.currentUserUID,
      message, this.hasPreviousChat, this.receiverData.receiverUID,
      this.authService.userProfileImg, this.receiverData.receiverProfileURL,
      this.authService.currentUserName, this.receiverData.receiverName);
    this.scrollToBottom();
    this.hasPreviousChat = true;
    this.message = '';
  }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(100);
      this.inputElement.setFocus();
    }, 150);
  }

  dateTime(dateTime) {
    return dateTime.seconds * 1000;
  }
}
