import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Service } from '../../providers/service';
import { Functions } from '../../providers/functions/functions';
import firebase from 'firebase';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
	
		form: any;
  fileName: any;
  metadata: any;
  uploadTask: any;
  storageRef: any;
  downloadURL: any;
  selectedFile: any;
  categoryName: any;
  restaurantName: any;
  restaurantCategoryName: any;
  brand: any;
  vendor: any;
  brandName: any;
  vendorName: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public nav: NavController, public params: NavParams, public service: Service, public functions: Functions) {
	  
	    this.form = {};
     this.form.in_stock = true;
     this.form.vendor = "";
     this.form.brand = "";
     this.form.sale_price = "";
	 
	  this.service.getRestaurantsList().on('value', snapshot => {

      this.restaurantName = [];

      snapshot.forEach( snap => {
        this.restaurantName.push({
        id: snap.key,
        name: snap.val().title,
      
        });
      });
    });
	
	this.service.getRestaurantCategoryList().on('value', snapshot => {

      this.restaurantCategoryName = [];

      snapshot.forEach( snap => {
        this.restaurantCategoryName.push({
        id: snap.key,
        name: snap.val().cat_name
      
        });
      });
    });
	
	

    this.service.getCategoryList().on('value', snapshot => {

      this.categoryName = [];

      snapshot.forEach( snap => {
        this.categoryName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });


  this.service.getBrandList().on('value', snapshot => {

      this.brandName = [];

      snapshot.forEach( snap => {
        this.brandName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });


  this.service.getVendorList().on('value', snapshot => {

      this.vendorName = [];

      snapshot.forEach( snap => {
        this.vendorName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });
	 
  }
  
  
  addProduct(){
     if(this.validate()){
            this.service.addRestaurantPro(this.form.name, this.form.available , this.form.category , this.form.description, this.form.image , this.form.percent, this.form.price, this.form.real_price, this.form.stock , this.form.categories, this.downloadURL)
      .then( () =>{
        //this.navCtrl.pop();
      });
     }

    
  }


  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    this.upLoad();
  }

  upLoad(){

    var fileName = this.selectedFile.name;

    var storageRef = firebase.storage().ref('Products Image/' + fileName);

    var metadata = { contentType: 'image/jpeg'};

    var uploadTask = storageRef.put(this.selectedFile, metadata);

    uploadTask.on('state_changed', (snapshot) =>{

      console.log(snapshot);

      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100 ;

        console.log('upload' + progress + '% done' );

        switch(uploadTask.snapshot.state){
          case firebase.storage.TaskState.PAUSED:   // or Paused
          console.log('upLoad is paused');
          break;

          case firebase.storage.TaskState.RUNNING:   // OR Running
          console.log('upload is running');
          break;

        }

      }, (error) =>  {
          console.log(error);

        },() =>{

          this.downloadURL = uploadTask.snapshot.downloadURL;
           this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log('success');
        });

  }


  validate(){
     if(this.form.name == undefined || this.form.name == ''){
      this.errorMessage = 'Please Add Product Name';
      return false;
    }
    if(this.form.available == undefined || this.form.available == ''){
      this.errorMessage = 'Please Add Available';
      return false;
    }

    if(this.form.category == undefined || this.form.category == ''){
      this.errorMessage = 'Please Add Category';
      return false;
    }
    if(this.form.description == undefined || this.form.description == ''){
      this.errorMessage = 'Please Add Description';
      return false;
    }
    if(this.downloadURL == undefined || this.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

}
