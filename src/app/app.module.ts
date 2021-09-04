
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagesPage } from './modals/languages/languages.page';

import { IonicStorageModule } from '@ionic/storage';
import { SettingsConfigService } from './services/settings-config.service';
import { FormsModule } from '@angular/forms';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Commons } from './modals/model/commons';
import { AllServices } from './modals/model/all-services';

import { Camera } from '@ionic-native/camera/ngx';
import { LanguagesPageModule } from './modals/languages/languages.module';
import { AuthPageModule } from './modals/auth/auth.module';
import { ThemesPageModule } from './modals/themes/themes.module';
import { CurrentUser } from './modals/model/current-user';
import { EditProfilePageModule } from './profile/edit-profile/edit-profile.module';
import { ImagePreviewPageModule } from './modals/image-preview/image-preview.module';
import { CreatePostPageModule } from './post/create-post/create-post.module';
import { SendRequestPageModule } from './post/send-request/send-request.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    
    SuperTabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    
    // Model Controller
    ThemesPageModule,
    LanguagesPageModule,
    AuthPageModule,
    EditProfilePageModule,
    CreatePostPageModule,
    ImagePreviewPageModule,
    SendRequestPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SettingsConfigService,
    CurrentUser,
    CallNumber,
    Commons,
    AppVersion,
    AllServices,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
