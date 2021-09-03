import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';
import { Constants } from '../modals/constants/constans';

@Injectable({
  providedIn: 'root'
})


// export interface CreatePost {
//   postTitle: string;
//   postSubCategory: string;
//   postDescription: string;
//   postServiceName: string;
//   postBudget: string;
//   postJobTime: string;
//   dateCreated: Date;
//   UID: string;
// }

export class SharedService {
  // private servicesCollenction: AngularFirestoreCollection<any>;
  // private postsCollection: AngularFirestoreCollection<any>;
  private collection: AngularFirestoreCollection<any>;
  private servicesData: Observable<any[]>
  private postsData: Observable<any[]>
  private singalData: Observable<any[]>
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {
    // this.postsCollection = this.fireStore.collection<any>(Constants.POSTS);

  }

  getAllServices() {
    this.collection = this.fireStore.collection<any>(Constants.SERVICES);
    this.servicesData = this.collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.servicesData;
  }
  getAllPosts() {
    this.collection = this.fireStore
      .collection<any>(Constants.POSTS,
        ref => ref
          .where('status', '==', 'active')
          .orderBy('dateCreated', 'desc'));
    this.postsData = this.collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.postsData;
  }
  getServiceData(serviceId: string) {
    console.log("service ID", serviceId);
    let u = this.collection.doc(serviceId).valueChanges();
    return u;
  }
  getServiceDataByName(serviceName: string) {
    this.collection = this.fireStore.collection<any>(Constants.SERVICES, ref =>
      ref.where('serviceName', '==', serviceName));
    this.singalData = this.collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return this.singalData;
  }
  getUsersByServiceName(serviceName: string) {
    let userWithSameService = this.fireStore.collection<any>(Constants.USERS, ref =>
      ref.where('userService', '==', serviceName));
    let sameServicesUserData = userWithSameService.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return sameServicesUserData;
  }

  getMyPostList(postIDList: Array<string>, currentUserUID: string) {
    this.collection = this.fireStore.collection<any>(Constants.POSTS,
      ref => ref
        .where('UID', '==', currentUserUID)
        .orderBy('dateCreated', 'desc')
    );
    let myPostsList = this.collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return myPostsList;
  }
  getAPost(postID: string) {
    let postData = this.collection.doc(postID).valueChanges();
    return postData;
  }

  postAJob(data: any, currentUserUID: string) {
    let employeeBids: Array<string> = [];
    const postJob = {
      title: data.title,
      subCategory: data.subCategory,
      description: data.description,
      serviceName: data.serviceName,
      budget: data.budget,
      jobTime: data.jobTimeNumber + " " + data.jobTimeUnit,
      dateCreated: new Date(),
      UID: currentUserUID,
      employeeBids: employeeBids,
      status: 'active'
    }
    this.fireStore.collection<any>(Constants.POSTS).add(postJob).then((docRef: any) => {
      console.log("Doc Ref", docRef.id);
      this.fireStore.doc(`${Constants.USERS}/${currentUserUID}`).update({ userPosts: firestore.FieldValue.arrayUnion(docRef.id) });
    });
  }
  sendRequestOnPost(postID: string, data: any, currentUserUID: string) {
    const sendRequest = {
      postID: postID,
      UID: currentUserUID,
      title: data.title,
      jobTime: data.jobTimeNumber + " " + data.jobTimeUnit,
      startTime: data.availableStartTime + " " + data.availableStartTimeUnit,
      endTime: data.availableEndTime + " " + data.availableEndTimeUnit,
      budget: data.budget,
      abailabele24Hour: data.available24Hour,
      dateCreated: new Date(),
      description: data.description,
    }
    console.log("sendRequest", sendRequest, data.available24Hour);
    this.fireStore.collection<any>(Constants.BIDS).add(sendRequest).then((docRef: any) => {
      console.log("Doc Ref", docRef.id);
      this.fireStore.doc(`${Constants.USERS}/${currentUserUID}`).update({ userBids: firestore.FieldValue.arrayUnion(docRef.id) });
      this.fireStore.doc(`${Constants.POSTS}/${postID}`).update({ employeeBids: firestore.FieldValue.arrayUnion(docRef.id) });
    });
  }

  getAllBidforAPost(postID: string) {
    this.collection = this.fireStore.collection<any>(Constants.BIDS,
      ref => ref
        .where('postID', '==', postID)
        .orderBy('dateCreated', 'desc')
    );
    let myBids = this.collection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    return myBids;
  }
  getABidforPost(bidID: string) {
    let bitData = this.collection.doc(bidID).valueChanges();
    return bitData;
  }


}