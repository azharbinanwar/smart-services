import { Injectable } from '@angular/core';
import { CurrentUser } from '../modals/model/current-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<CurrentUser>;
  private userData: Observable<CurrentUser[]>

  userUID: string;
  userProfileImg: string;
  currentUserUID: string;
  currentUserDescription: string;
  currentUserName: string;
  currentUserEmail: string;
  currentUserDateCreated;
  currentUserPhoneNo: number;
  currentUserBaseLocation: string;
  currentUserPosts: Array<string> = [];
  currentUserReviews: any;
  currentUserOrder: any;
  userChats: Array<string> = [];
  userFavourite: Array<string> = [];
  userIsFavouriteBy: Array<string> = [];
  userBids: Array<string> = [];

  currentUserService: string;
  currentUserType: string; // EMPLOYE OR CLIENT
  currentUserSkills: Array<string> = [];
  currentUserCertificationFrom: string;
  currentUserSPDate;
  currentUserExperience: string


  currentUserData;




  constructor(
    // MODAL CLASS
    public currentUser: CurrentUser,
    // private sharedService: SharedService,
    // FIREBASE
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,

    // Router
    private router: Router,

  ) {
    this.userCollection = this.fireStore.collection<CurrentUser>('users');
    this.userData = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  currentUserFavouriteList: any;
  async setCurrentUser() {
    this.fireAuth.authState.subscribe(auth => {
      if (auth) {
        if (this.fireAuth.auth.currentUser != null &&
          this.fireAuth.auth.currentUser.uid == auth.uid
        ) {
          console.log("User Signed In", this.fireAuth.auth.currentUser.uid);
          this.getUser(this.fireAuth.auth.currentUser.uid).subscribe(async res => {
            this.currentUserData = res;
            console.log(res);
            this.userUID = this.currentUserData.userUID;
            this.userProfileImg = this.currentUserData.userProfileImg;
            this.currentUserUID = this.fireAuth.auth.currentUser.uid;
            this.currentUserDescription = this.currentUserData.userDescription;
            this.currentUserName = this.currentUserData.userName;
            this.currentUserEmail = this.currentUserData.userEmail;
            this.currentUserDateCreated = this.currentUserData.userDateCreated.seconds * 1000;
            this.currentUserBaseLocation = this.currentUserData.userBaseLocation;
            this.currentUserSPDate = this.currentUserData.userSPDate.seconds * 1000;
            this.currentUserExperience = this.currentUserData.userExperience;
            this.currentUserPhoneNo = this.currentUserData.userPhoneNo;
            this.currentUserCertificationFrom = this.currentUserData.userCertificationFrom;

            this.currentUserPosts = [];
            this.currentUserType = this.currentUserData.userType;
            this.currentUserService = this.currentUserData.userService;

            this.currentUserData.userPosts.forEach(post => {
              this.currentUserPosts.push(post);
            });

            this.currentUserSkills = [];
            this.currentUserData.userSkills.forEach(skill => {
              this.currentUserSkills.push(skill);
            });
            
            this.currentUserData.userChats.forEach(users => {
              this.userChats.push(users);
            });
            this.userIsFavouriteBy = [];
            this.currentUserData.userIsFavouriteBy.forEach(favouriteBy => {
              this.userIsFavouriteBy.push(favouriteBy);
            });
            this.userBids = [];
            this.currentUserData.userBids.forEach(userBid => {
              this.userBids.push(userBid);
            });
            // this.userBids = [];
            // this.currentUserData.userOrders.forEach(order => {
            //   this.userBids.push(order);
            // });
            this.userFavourite = [];
            this.currentUserData.userFavourite.forEach(favourite => {
              this.userFavourite.push(favourite)
            });

            console.log("PHNNNNNNOE", this.currentUserPhoneNo, this.currentUserData.userPhoneNo);
            
            if(this.userFavourite.length > 0) {
              await this.getFavouriteList(this.userFavourite).subscribe(data => {
                this.currentUserFavouriteList = data;
                console.log("Favourite", data, this.currentUserFavouriteList);
                
              })
            }
          });
        } else {
          console.log("Sign in or Sign up");
        }
      }
    });
  }


  // GET ALL USER LIST
  getUsers() {
    return this.userData;
  }

  // GET SINGAL USER DATA
  getUser(id: string) {
    let singalUserData = this.userCollection.doc(id).valueChanges();
    return singalUserData;
  }
  getFavouriteList(favouriteList: Array<string>) {
    let favouriteCollection = this.fireStore.collection<any>('users', ref =>
      ref.where('userUID', 'in', favouriteList));
    let favourteUserList = favouriteCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return favourteUserList;
  }


  // UPADTE USER
  updateUser(currentUser: CurrentUser, id: string) {
    return this.userCollection.doc(id).update(currentUser);
  }

  getUserInChat(userUID: string) {
    // console.log('array Data', usersUID);

    this.userCollection = this.fireStore.collection<CurrentUser>('users', ref =>
      ref.where('userChats', 'array-contains', userUID));
    let usersInChat = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
    return usersInChat;

  }
  // DELETE USER
  deleteUser(id: string) {
    return this.userCollection.doc(id).delete();
  }


  // SIGN OUT USER
  async userSignOut() {
    await this.fireAuth.auth.signOut();
    this.currentUserFavouriteList = null;
    console.log("Sign Out");
  }

  toggleFavourite(otherUserUID: string) {
    if (this.userFavourite.indexOf(otherUserUID) == -1) {
      this.fireStore.doc(`users/${this.currentUserUID}`).update({ userFavourite: firestore.FieldValue.arrayUnion(otherUserUID) });
      this.fireStore.doc(`users/${otherUserUID}`).update({ userIsFavouriteBy: firestore.FieldValue.arrayUnion(this.currentUserUID) });
    }
    else {
      this.fireStore.doc(`users/${this.currentUserUID}`).update({ userFavourite: firestore.FieldValue.arrayRemove(otherUserUID) });
      this.fireStore.doc(`users/${otherUserUID}`).update({ userIsFavouriteBy: firestore.FieldValue.arrayRemove(this.currentUserUID) });
    }

  }









  // ==========================UPDATE USER PROFILE==========================

  // UPDATE PROFILE FOR NORMAL USER
  updateProfile(userProfile: any) {
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userName: userProfile.user_Name });
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userDescription: userProfile.user_Description });
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userPhoneNo: userProfile.user_PhoneNo });
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userBaseLocation: userProfile.user_BaseLocation });
  }
  // UPDATE PROFILE FOR SERVICE PROVIDDER
  updateAndBecomeSP(userProfile: any, userBecomeSP: any, skillList: Array<string>, previousService: string) {

    console.log("length of input", skillList.length);

    this.updateProfile(userProfile);
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userExperience: userBecomeSP.user_Experience });
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userCertificationFrom: userBecomeSP.user_CertificationFrom });
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userService: userBecomeSP.user_Service });
    this.fireStore.doc(`users/${this.currentUserUID}`).set({ userSkills: firestore.FieldValue.arrayUnion(skillList) });
    console.log("this.authService.currentUserType", this.currentUserType);

    if (this.currentUserType == 'Client') {
      this.fireStore.doc(`users/${this.currentUserUID}`).update({ userSPDate: new Date() });
    }
    let employee = 'Employee'
    this.fireStore.doc(`users/${this.currentUserUID}`).update({ userType: employee });

  }


}
