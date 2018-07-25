import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';
import  firebase from 'firebase';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
	
	form: any;
  currentUser: any;
  errorMessage: any;
  customer: any;

  constructor(public nav: NavController, public params: NavParams, public service: Service) {
	    	this.form = {};
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser);
    this.customer = params.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  
  addAddress(){
      this.service.saveRestaurantCustomers(this.customer.displayName, this.customer.phone, this.customer.address, this.currentUser.uid)
      .then(() =>{
        this.nav.pop();
      });
  }

}
