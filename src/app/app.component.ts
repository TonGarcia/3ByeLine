import { Component, ViewChild } from '@angular/core';
import { AlertController  } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Values } from '../providers/values';

import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart/cart';
import { MyorderPage } from '../pages/myorder/myorder';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { MapPage } from '../pages/map/map';

import { AddRestaurantPage } from '../pages/add-restaurant/add-restaurant';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { AddItemPage } from '../pages/add-item/add-item';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { AllOrdersPage } from '../pages/all-orders/all-orders';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any , icon: string}>;

  public fireAuth : any;

  public userProfiles: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController, public values: Values, public translateService: TranslateService) {





	// Copy your firebase credencial here
  firebase.initializeApp({
    apiKey: "AIzaSyDHtNgAdj1Zw2m1nk3PSannwFv3CHJm4Gg",
    authDomain: "byelineapp.firebaseapp.com",
    databaseURL: "https://byelineapp.firebaseio.com",
    projectId: "byelineapp",
    storageBucket: "",
    messagingSenderId: "645927991461"
  });

	this.initializeApp();

	this.fireAuth = firebase.auth();

	firebase.auth().onAuthStateChanged((user) => {
        if (user) {

          this.values.userRole = firebase.database().ref('/users').child(user.uid).on('value', snapshot =>{
            if(snapshot.val()){
                this.userProfiles = snapshot.val();
            }

          });
		}
	});

    // used for an example of ngFor and navigation
	/***
    this.pages = [
      { title: 'Restaurants', component: ListPage,icon: "restaurant" },
	  { title: 'My Profile', component: MyProfilePage ,icon: "person"},
      { title: 'Cart', component: CartPage,icon: "cart" },
	  { title: 'My Order', component: MyorderPage,icon: "reorder" },
	  { title: 'Wish List', component: WishlistPage,icon: "heart" },
	  { title: 'Map', component: MapPage,icon: "locate" },

    ];
	*/

	this.pages = [
      { title: 'Restaurants', component: ListPage,icon: "restaurant" },
	  { title: 'Add Restaurant', component: AddRestaurantPage ,icon: "cafe"},
	  { title: 'Add Category', component: AddCategoryPage ,icon: "create"},
	  { title: 'Add Item', component: AddItemPage ,icon: "add-circle"},
	  { title: 'Customers', component: CustomerListPage ,icon: "person"},
	  { title: 'All Orders', component: AllOrdersPage ,icon: "folder-open"},


    ];

	 this.translateService.setDefaultLang('english');

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.values.isLoggedIn = true;
          this.values.userRole = firebase.database().ref('/Customer-Role').child(user.uid).on('value', snapshot =>{
            if(snapshot.val()){
                this.values.userRole = snapshot.val().role;
            }

          });

        }
      });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	  this.pushsetup();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut(){
	  this.fireAuth.signOut();
	  console.log('logged out');
	  this.nav.setRoot(HomePage);
  }


    pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '645927991461'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID

  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
}
}
