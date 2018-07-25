import { Component, OnInit} from '@angular/core';
import { Service } from '../../providers/service';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Values } from '../../providers/values';
import { CategoryPage } from '../category/category';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { EditRestaurantPage } from '../edit-restaurant/edit-restaurant';
import { CustomerDetailsPage } from '../customer-details/customer-details';

import firebase from 'firebase';

/**
 * Generated class for the CustomerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {
	
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
          "favorite" : true,
          "id" : 1,
          "image" : "assets/images/avatar/0.jpg",
          "title" : "Isaac Raid"
        }, {
          "favorite" : false,
          "id" : 2,
          "image" : "assets/images/avatar/1.jpg",
          "title" : "Jason Graham"
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
  }
  
  
  ngOnInit(){
console.log('data');

  this.nativeStorage.getItem('firebasedatabanners')
    .then(
      data => this.handlebanners(data),
      error => console.error(error)
  );

  this.nativeStorage.getItem('firebasedatacategories')
    .then(
      data => this.handlecategories(data),
      error => console.error(error)
  );

  
  
  this.service.getAllRestaurantUsers().on('value', snapshot =>{
    
	console.log(snapshot.val());
    this.params.data.items = [];
    //this.saveCategories(snapshot.val());
    snapshot.forEach( snap =>{
        this.params.data.items.push({
		  
          id: snap.key,
          title: snap.val().displayName,
          image: snap.val().photoURL,
		  image_url : "assets/images/avatar/1.jpg",
		  background : "assets/images/background/7.jpg",
		  address: snap.val().address,
		  phone : snap.val().phone,
		  timeStamp: snap.val().timeStamp,
		  email: snap.val().email,
		  favorites : snap.val().favorites
		  
		  
        });  
      });
	  
	  console.log(this.params.data.items);
    });


    this.service.getBanners().on('value', snapshot =>{
      this.bannerList = snapshot.val();
      this.saveBanners(snapshot.val());
    });

    this.service.getSetting().on('value', snapshot =>{
      //this.values.currency = snapshot.val().currency;
    });
     
  }

  getProducts(id){
    this.nav.push('ProductsPage', {id:id});
  }
  
  getCustomerDetails(item){
	  this.nav.push(CustomerDetailsPage, {item:item});
  }
  
  getCategory(id){
	  console.log("inside category");
	  console.log(id);
	  this.nav.push(CategoryPage,{id:id});
	  //this.nav.push(Category);
	 // console.log(id);
  }
  
  editRestaurant(restaurant){
     this.nav.push(EditRestaurantPage, restaurant);
  }
  
  deleteRestaurant(id){
	  this.service.deleteRestaurant(id);
  }

  saveBanners(data){

    this.nativeStorage.setItem('firebasedatabanners', data)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }

  saveCategories(catsnap){
    this.nativeStorage.setItem('firebasedatacategories', catsnap)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }
  
  goToCart(){
	  this.nav.push(CartPage);
  }
  

  handlebanners(data){
    this.bannerList = data;
    console.log(data);
  }

  handlecategories(data){
    this.categoryList = [];
    for(let item in data){
      this.categoryList.push({
          id: data[item].id,
          name: data[item].name,
          downloadURL: data[item].downloadURL,
          description: data[item].description
        });
    }  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerListPage');
  }

}
