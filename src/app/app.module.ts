import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './shared/app.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBeUW5Jj2O4Vuk4-6qADFUmfJe4A0_xoqU',
  authDomain: 'mahjong-c2571.firebaseapp.com',
  databaseURL: 'https://mahjong-c2571.firebaseio.com',
  projectId: 'mahjong-c2571',
  storageBucket: 'mahjong-c2571.appspot.com',
  messagingSenderId: '195224008416',
  appId: '1:195224008416:web:fb7f5acb9212cd21248285',
  measurementId: 'G-WBCPTTD8DC'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
