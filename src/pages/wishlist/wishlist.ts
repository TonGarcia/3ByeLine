import { Component, OnInit} from '@angular/core';
import { Service } from '../../providers/service';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Values } from '../../providers/values';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { ProductDetailsPage } from '../product-details/product-details';

import firebase from 'firebase';

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
	
	
	 categoryList: any;
  bannerList: any;
  firebasedata: any;
  restaurants: any;
  public categoryId: any;
  
  
  params:any = {};
  
  
  selectedItem: any;
  icons: string[];

  constructor(public values:Values, private nativeStorage: NativeStorage, public nav: NavController, public navParams: NavParams, public service: Service, public translateService: TranslateService) {
	  
	  this.categoryList = [];
		  this.firebasedata = [];
		  this.restaurants = [];
		  console.log('data');
	  
	  this.params.data = {
        "items" : [ {
          "delate" : "Delete",
          "id" : 1,
          "image" : "assets/images/background/4.jpg",
          "subtitle" : "Monday, 15th Oct. 2017",
          "title" : "Free Ride"
        }, {
          "delate" : "Delete",
          "id" : 2,
          "image" : "assets/images/background/0.jpg",
          "subtitle" : "Thursday, 20th Feb. 2017",
          "title" : "Main Stage Event"
        }, {
          "delate" : "Delete",
          "id" : 3,
          "image" : "assets/images/background/3.jpg",
          "subtitle" : "Friday, 10th Aug. 2017",
          "title" : "Mountain Tour"
        }, {
          "delate" : "Delete",
          "id" : 4,
          "image" : "assets/images/background/5.jpg",
          "subtitle" : "Wednesday, 17th May 2016",
          "title" : "Sea Tour"
        }, {
          "delate" : "Delete",
          "id" : 5,
          "image" : "assets/images/background/6.jpg",
          "subtitle" : "Sunday, 11th June 2017",
          "title" : "Open Air Concert"
        }, {
          "delate" : "Delete",
          "id" : 6,
          "image" : "assets/images/background/1.jpg",
          "subtitle" : "Friday, 10th Jan. 2017",
          "title" : "Bridge Tour"
        } ]
      }
	  
	  this.params.events = {
        'onItemClick': function(item: any) {
            console.log("onItemClick");
        },
        'onDelete': function(item: any) {
            console.log("onDelete");
        },
        'onButtonGetClick': function(item: any) {
            console.log("onButtonGetClick");
        }
    };
  }

  ionViewDidLoad() {
	  
	  
	  
	this.service.getUserFavouriteList().on('value', snapshot =>{
    
		console.log(snapshot.val());
		this.params.data.items = [];
    
		snapshot.forEach( snap =>{
			this.params.data.items.push({
			  id: snap.key,
			  title: snap.val().name,
			  subtitle:  snap.val().description,
			  image: snap.val().image,
			  delate: "Delete",
			  ionBadge: snap.val().price
			});  
		  });
		  
		  console.log(this.params.data.items);
	  
    });
	  
    console.log('ionViewDidLoad WishlistPage');
  }
  
  removeFavItem(item){
	  this.service.removeFavItem(item);
  }
  
  goToItem(item){
	  this.nav.push(ProductDetailsPage,{id:item.id}); ;
  }

}
