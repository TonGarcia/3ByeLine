import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';
import { ListPage } from '../list/list';
import { AllOrdersPage } from '../all-orders/all-orders';
import firebase from 'firebase';


/**
 * Generated class for the OrderStatusChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-status-change',
  templateUrl: 'order-status-change.html',
})
export class OrderStatusChangePage {
	
	  files: any;
  category: any;
  snapshot: any;
  downloadURL: any;
  selectedFile: any;
  restaurantName : any;
  public fileName: any;
  public storageRef: any;
  public uploadTask: any;
  product: any;
  disableSubmit: boolean = false;
  errorMessage: any;

  constructor(public nav: NavController, public params: NavParams, public service: Service) {
	  
	   this.category = params.data;
	  console.log(this.category);
	  
	  
	  
	  this.restaurantName = {
        "items" : [ {
          
          "id" : "Delivered",
          "name" : "Delivered"
		}
		, {
          
          "id" : "Queued",
          "name" : "Queued"
        }
		
		, {
          
          "id" : "Canceled",
          "name" : "Canceled"
        }
		]
	  }
  }
  
  saveStatus(category){
	  this.service.saveStatus(category);
	  this.nav.setRoot(AllOrdersPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderStatusChangePage');
  }

}
