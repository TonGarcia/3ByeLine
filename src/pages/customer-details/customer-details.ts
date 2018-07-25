import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';
import { ListPage } from '../list/list';
import firebase from 'firebase';

/**
 * Generated class for the CustomerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {
	
	  id: any;
  product:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  brandName: any;
  vendorName: any;
  categoryName: any;
  errorMessage: any;
  restaurantName: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public service: Service) {
	  
	  this.product = params.data.item;
	  
	  console.log(this.product);
	  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailsPage');
  }

}
