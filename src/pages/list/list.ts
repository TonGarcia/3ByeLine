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

import firebase from 'firebase';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	
  
  categoryList: any;
  bannerList: any;
  firebasedata: any;
  restaurants: any;
  public categoryId: any;
  
  
  params:any = {};
  
  
  selectedItem: any;
  icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;

  constructor(public values:Values, private nativeStorage: NativeStorage, public nav: NavController, public navParams: NavParams, public service: Service, public translateService: TranslateService) {
    // If we navigated to this page, we will have an item available as a nav param
		  this.categoryList = [];
		  this.firebasedata = [];
		  this.restaurants = [];
		  console.log('data');
		  
		   //this.nav = nav;
		  
		
		 
	this.params.data = {
        "items" : [ {
          "backgroundImage" : "/images/background/1.jpg",
          "expandItems" : {
            "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            "iconsStars" : [ {
              "iconActive" : "icon-star",
              "iconInactive" : "icon-star-outline",
              "isActive" : true
            }, {
              "iconActive" : "icon-star",
              "iconInactive" : "icon-star-outline",
              "isActive" : true
            }, {
              "iconActive" : "icon-star",
              "iconInactive" : "icon-star-outline",
              "isActive" : true
            }, {
              "iconActive" : "icon-star",
              "iconInactive" : "icon-star-outline",
              "isActive" : true
            }, {
              "iconActive" : "icon-star",
              "iconInactive" : "icon-star-outline",
              "isActive" : false
            } ],
            "reviews" : "4.12 (78 reviews)",
            "title" : "Lorem ipsum dolor sit amet"
          },
          "icon" : "ios-arrow-dropright",
          "iconText" : "Read more",
          "id" : 1,
          "subtitle" : "Monday, 15th Oct. 2017",
          "title" : "Main Stage Event"
        } ]
      }

		  
	  
	   this.params.events = {
        'onItemClick': function(item: any) {
           console.log('onItemClick');
        },
        'onRates': function(index: number) {
            console.log('onRates');
        },
        'onCheckBoxClick': function(item: any) {
            console.log('onCheckBoxClick');
        },
        'onButtonClick' : function(item: any) {
           console.log('onButtonClick');
		   
		   
        }
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

  
  this.service.getRestaurantsList().on('value', snapshot =>{
    
	console.log(snapshot.val());
    this.params.data.items = [];
    //this.saveCategories(snapshot.val());
    snapshot.forEach( snap =>{
        this.params.data.items.push({
          id: snap.key,
          title: snap.val().title,
		  subtitle:  snap.val().info,
          backgroundImage: snap.val().firebase_url,
		  info: snap.val().description,
		  address: snap.val().address,
		  lat: snap.val().lat,
		  long: snap.val().long,
		  mark: snap.val().mark,
		  options: snap.val().option,
		  outlet: snap.val().outlet,
		  phonenumber: snap.val().phonenumber,
		  icon: "ios-arrow-dropright",
		  iconText: "Read more",
          description: snap.val().info
		  
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
}
