import { Component, OnInit} from '@angular/core';
import { Service } from '../../providers/service';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Values } from '../../providers/values';
import { CategoryPage } from '../category/category';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { OrderDetailsPage } from '../order-details/order-details';
import { OrderStatusChangePage } from '../order-status-change/order-status-change';



import firebase from 'firebase';

/**
 * Generated class for the AllOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-orders',
  templateUrl: 'all-orders.html',
})
export class AllOrdersPage {
	
	currentUser: any;
	myOrderList: any;
	id:any;
	
	params:any = {};

  constructor(public values:Values, private nativeStorage: NativeStorage, public nav: NavController, public navParams: NavParams, public service: Service, public translateService: TranslateService) {
	  
	  this.params.data = {
        "items" : [ {
          "favorite" : true,
          "id" : 1,
          "image" : "assets/images/avatar/0.jpg",
          "title" : "Isaac Raid"
        }, {
          "favorite" : false,
          "id" : 2,
          "image" : "assets/images/avatar/1.jpg",
          "title" : "Jason Graham"
        }, {
          "favorite" : true,
          "id" : 3,
          "image" : "assets/images/avatar/2.jpg",
          "title" : "Abigail Ross"
        }, {
          "favorite" : false,
          "id" : 4,
          "image" : "assets/images/avatar/3.jpg",
          "title" : "Justin Rutherford"
        }, {
          "favorite" : false,
          "id" : 5,
          "image" : "assets/images/avatar/4.jpg",
          "title" : "Nicholas Henderson"
        }, {
          "favorite" : true,
          "id" : 6,
          "image" : "assets/images/avatar/5.jpg",
          "title" : "Elizabeth Mackenzie"
        }, {
          "favorite" : false,
          "id" : 7,
          "image" : "assets/images/avatar/6.jpg",
          "title" : "Melanie Ferguson"
        }, {
          "favorite" : true,
          "id" : 8,
          "image" : "assets/images/avatar/7.jpg",
          "title" : "Fiona Kelly"
        }, {
          "favorite" : true,
          "id" : 9,
          "image" : "assets/images/avatar/8.jpg",
          "title" : "Nicholas King"
        }, {
          "favorite" : true,
          "id" : 10,
          "image" : "assets/images/avatar/9.jpg",
          "title" : "Victoria Mitchell"
        }, {
          "favorite" : false,
          "id" : 11,
          "image" : "assets/images/avatar/10.jpg",
          "title" : "Sophie Lyman"
        }, {
          "favorite" : false,
          "id" : 12,
          "image" : "assets/images/avatar/11.jpg",
          "title" : "Carl Ince"
        }, {
          "favorite" : false,
          "id" : 13,
          "image" : "assets/images/avatar/12.jpg",
          "title" : "Michelle Slater"
        }, {
          "favorite" : false,
          "id" : 14,
          "image" : "assets/images/avatar/13.jpg",
          "title" : "Ryan Mathis"
        }, {
          "favorite" : false,
          "id" : 15,
          "image" : "assets/images/avatar/14.jpg",
          "title" : "Julia Grant"
        }, {
          "favorite" : false,
          "id" : 16,
          "image" : "assets/images/avatar/15.jpg",
          "title" : "Hannah Martin"
        } ]
      }
	  
	  
	  this.params.events = {
            'onItemClick': function(item: any) {
                console.log("onItemClick");
            },
            'onFavorite': function(item) {
                item.favorite = !item.favorite;
                console.log("onFavorite");
            },
        };
	  
	  
	  
	  
	  this.params.data.items = [];

	  
	  
	  
  	this.service.getAllOrderList().on('value', snapshot =>{
    		this.myOrderList = [];
			this.params.data.items = [];
			console.log(snapshot.val());
		 snapshot.forEach( snap => {
      	 	 this.myOrderList.push({
  		    	  id: snap.key,
				  customerDetails: snap.val().customerDetails,
  		    	  items: snap.val().items,
                  total: snap.val().total,
				  status: snap.val().status,
				  timeStamp: snap.val().timeStamp
      	   });
    	  });
			/***
    			 snapshot.forEach( snap => {
      	 	 this.myOrderList.push({
  		    	  id: snap.key,
  		    		items: snap.val().items,
              total: snap.val().total
      	   });
    	  });
		  */
		  
		  console.log(this.myOrderList);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }
  

 
  getOrderDetails(id){
  	console.log(id);
   this.nav.push(OrderDetailsPage, {id: id});
  }
  
  deleteOrder(id){
	  this.service.delOrder(id);
  }
  
  editStatus(it){
	  this.nav.push(OrderStatusChangePage , {it: it});
  }
  


}
