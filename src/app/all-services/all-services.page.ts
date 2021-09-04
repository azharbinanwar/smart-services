import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SettingsConfigService } from '../services/settings-config.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.page.html',
  styleUrls: ['./all-services.page.scss'],
})
export class AllServicesPage implements OnInit {

  allServicesList: any;
  constructor(
    // SERVICES
    public shared: SharedService,
    public authService: AuthService,
    public settingsConfigService: SettingsConfigService,
    public themeService: ThemeService,
    // FIREBASE
    private fireStore: AngularFirestore
  ) { }
userData;
private ideaCollection: AngularFirestoreCollection<any>;
  ngOnInit() {
    // this.ideaCollection = this.fireStore.collection<any>('chat');
    // let data = {'data': 'd'};
    // this.ideaCollection.add(data).then((docRef: any) => {
    //   console.log("Document Reference", docRef);
    // });
    this.shared.getAllServices().subscribe(res =>{
      this.allServicesList = res;
      console.log("all services", this.allServicesList)
    })
  }

}
