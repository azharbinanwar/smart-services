import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, take, timestamp } from 'rxjs/operators';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

export interface ChatMessage {
  chatID: string;
  sentDate: Date;
  senderUID: string;
  message: string;
  type: string;
  seen: boolean;
  delete: Array<string>[];
  imageURL: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatMessages: Observable<ChatMessage[]>;
  private chatCollection: AngularFirestoreCollection<ChatMessage>;


  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {
  }
  getChatMessages(): Observable<ChatMessage[]> {
    this.chatCollection = this.fireStore.collection<ChatMessage>('chat');
    this.chatMessages = this.chatCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.chatMessages;
  }
  getChatMessage(id: string): Observable<ChatMessage> {
    return this.chatCollection.doc<ChatMessage>(id).valueChanges().pipe(
      take(1),
      map((chatMessages: any) => {
        chatMessages.id = id;
        return chatMessages
      })
    );
  }
  updateChatMessages(chatMessage: ChatMessage): Promise<void> {
    // return this.chatCollection.doc().update({ message: chatMessage.message });
    return;
  }
  checkPreviousChat(receiverUID: string): Observable<any> {
    this.chatCollection = this.fireStore.collection<ChatMessage>('users', ref =>
      ref.where('userChats', 'array-contains', receiverUID));
    return this.chatCollection.doc<ChatMessage>(receiverUID).valueChanges().pipe(
      take(1),
      map((userChats: any) => {
        userChats.id = receiverUID;
        return userChats;
      })
    );


    // return res;
    // let previouseChat = this.chatCollection.snapshotChanges()
    // .pipe(
    //   take(1),
    //   map(actions => {
    //     map((chatMessages: any) => {
    //       chatMessages.id = chatID;
    //       return chatMessages   
    //     })
    //   })
    // );
    // return previouseChat;

  }


  getPreviousChat(chatID: string) {
    this.chatCollection = this.fireStore.collection<ChatMessage>(`chatMessages`);
    let previousChat = this.chatCollection.doc(chatID).valueChanges();
    return previousChat;
  }

  sendMessage(chatID: string, senderUID: string, message: string, hasPreviouseChat: boolean, receiverUID: string, senderImageURL, receiverImageURL, senderName: string, receiverName: string) {
    console.log('has chate', hasPreviouseChat);
    this.setPersonalChatList(
      hasPreviouseChat, message, senderUID,
      receiverUID, senderImageURL,
      receiverImageURL, senderName, receiverName);
      
      console.log('message', message);
      console.log('senderUID', senderUID);
      console.log('receiverUID', receiverUID);
      console.log('senderImageURL', senderImageURL);
      console.log('receiverImageURL', receiverImageURL);
      console.log('senderName', senderName);
      console.log('receiverName', receiverName);
  
    if (hasPreviouseChat) {
      this.startChatNext(chatID, senderUID, message);
    } else {
      this.startChatFirstTime(chatID, senderUID, message, receiverUID)
    }
  }

  startChatFirstTime(chatID: string, senderUID: string, message: string, receiverUID: string) {

    this.fireStore.doc(`users/${senderUID}`).update({ userChats: firestore.FieldValue.arrayUnion(receiverUID) });
    this.fireStore.doc(`users/${receiverUID}`).update({ userChats: firestore.FieldValue.arrayUnion(senderUID) });

    console.log('Start Chat First Time', 'set');
    this.fireStore.doc(`chatMessages/${chatID}`).set({
      chatMessage: firestore.FieldValue.arrayUnion({
        senderUID: senderUID,
        message: message,
        type: 'text',
        sentDate: new Date,
        imageURL: '',
        seen: [] = [],
        delete: [] = [],
      })
    });
  }
  startChatNext(chatID: string, senderUID: string, message: string) {
    console.log('Continoue Chat', 'update');
    this.fireStore.doc(`chatMessages/${chatID}`).update({
      chatMessage: firestore.FieldValue.arrayUnion({
        senderUID: senderUID,
        message: message,
        type: 'text',
        sentDate: new Date,
        imageURL: '',
        seen: [] = [],
        delete: [] = [],
      })
    });
  }




    setPersonalChatList(
    hasPreviouseChat: boolean,
    message: string,
    senderUID: string,
    receiverUID: string,
    senderImageURL,
    receiverImageURL,
    senderName: string,
    receiverName: string,
  ) {
    console.log('message', message);
    console.log('senderUID', senderUID);
    console.log('receiverUID', receiverUID);
    console.log('senderImageURL', senderImageURL);
    console.log('receiverImageURL', receiverImageURL);
    console.log('senderName', senderName);
    console.log('receiverName', receiverName);
    
    if (hasPreviouseChat) {
      this.chatCollection = this.fireStore.collection<ChatMessage>('personalChatList', ref =>
      ref.where('chatMessages.senderUID', '==', receiverUID));

      this.fireStore.doc(`personalChatList/${senderUID}`)
      .set({
        chatMessages: firestore.FieldValue.arrayUnion({
          receiverName: receiverName,
          receiverUID: receiverUID,
          lastMessage: message,
          seen: false,
          dateTime: new Date,
          receiverImageURL: receiverImageURL,
        })
      });
      this.fireStore.doc(`personalChatList/${receiverUID}`).set({
        chatMessages: firestore.FieldValue.arrayUnion({
          receiverName: senderName,
          receiverUID: this.fireAuth.auth.currentUser.uid,
          lastMessage: message,
          seen: false,
          dateTime: new Date,
          receiverImageURL: senderImageURL,
        })
      });

    }
    else {
      this.fireStore.doc(`personalChatList/${this.fireAuth.auth.currentUser.uid}`).set({
        chatMessage: firestore.FieldValue.arrayUnion({
          receiverName: receiverName,
          receiverUID: receiverUID,
          lastMessage: message,
          seen: false,
          dateTime: new Date,
          receiverImageURL: receiverImageURL,
        })
      });
      this.fireStore.doc(`personalChatList/${receiverUID}`).set({
        chatMessage: firestore.FieldValue.arrayUnion({
          receiverName: senderName,
          receiverUID: this.fireAuth.auth.currentUser.uid,
          lastMessage: message,
          seen: false,
          dateTime: new Date,
          receiverImageURL: senderImageURL,
        })
      });
    }
  }

}
