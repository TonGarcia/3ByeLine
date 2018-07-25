import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service';
import { ListPage } from '../list/list';
import firebase from 'firebase';

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {
	
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
	  
	   this.product = params.data;
    //this.downloadURL = "";
	console.log(this.product);

        this.service.getCategoryList().on('value', snapshot => {

      this.categoryName = [];

      snapshot.forEach( snap => {
        this.categoryName.push({
        id: snap.key,
        name: snap.val().title,
		category: snap.val().category,
		image: snap.val().image,
		ionBadge: snap.val().ionBadge,
		subtitle: snap.val().subtitle,
		title: snap.val().title
      
        });
      });
    });
	
	 this.service.getRestaurantsList().on('value', snapshot => {

      this.restaurantName = [];

      snapshot.forEach( snap => {
        this.restaurantName.push({
        id: snap.key,
		name: snap.val().title,
      
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
  
  
   editProduct(){
    if(this.validate()){
       this.service.editPro(this.product.title, this.product.category, this.product.res_image, this.product.res_name, this.product.image, this.product.id).then( () =>{
      		//this.navCtrl.pop();
			this.navCtrl.push(ListPage);
       });
    }
  }

  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoad();
  }


  upLoad(){

    var fileName = this.selectedFile.name;

    var storageRef = firebase.storage().ref('Products Image/' + fileName);

    var metadata = {contentType: 'image/jpeg'};

    var uploadTask = storageRef.put(this.selectedFile, metadata);

    uploadTask.on('state_changed', (snapshot) =>{
      console.log(snapshot);

      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('upload' + progress + '% done');

      switch(uploadTask.snapshot.state){
        case firebase.storage.TaskState.PAUSED: 
          console.log('upload is paused');
          break;

        case firebase.storage.TaskState.RUNNING:
          console.log('upload is running');
          break;  
      }

      }, (error) =>{
          console.log(error);
        }, () =>{

          this.product.image = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }

  validate(){
     if(this.product.title == undefined || this.product.title == ''){
      this.errorMessage = 'Please Add Product Name';
      return false;
    }
    if(this.product.category == undefined || this.product.category == ''){
      this.errorMessage = 'Please Add Category';
      return false;
    }
    if(this.product.res_image == undefined || this.product.res_image == ''){
      this.errorMessage = 'Please Add Regular Price';
      return false;
    }

    if(this.product.res_name == undefined || this.product.res_name == ''){
      this.errorMessage = 'Please Add Sale Price';
      return false;
    } 
    if(this.product.image == undefined || this.product.image == ''){
      this.errorMessage = 'Please Add Short Description';
      return false;
    }
    
   
    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }

}
