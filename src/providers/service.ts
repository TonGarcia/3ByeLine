import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Config } from './config';
import { URLSearchParams } from '@angular/http';
import { ListPage } from '../pages/list/list';
import { NavParams, IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Service provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Service {
  setting: any;
  product_id: Array<number> = [];
  url: any;
  cart: any;
  params:any;
  orderLists: any;
  public ref: any;  
  productsList:any;
  customerList: any;
  public orderList: any;
  public brandList: any;
  public vendorList: any;  
  public addProduct: any;
  public addCategory: any;
  public profilePictureRef: any; 
  public currentUser: any;
  public user: any;
  public restaurants: any;
  public restaurantCategory: any;
  public category: any;
  public items: any;
  public restaurantItems: any;
  public itemDetails: any;
  public restaurantUserInfo: any;
  public favoriteItem: any;
  public favoriteItemList: any;
  public cord: any;
  
  total: number = 0;
  proqty: Array<number> = [];
  getSecKey: any;
  users: any;
  bannerList: any;
  customerRole: any;
  constructor(public http: Http, private config: Config) {

    this.url = this.config.url;
    this.cart = { "line_items": [], };
    this.currentUser = firebase.auth().currentUser;
    this.setting = firebase.database().ref('/Setting');
    this.bannerList = firebase.database().ref('/Banners');
    //this.orderList = firebase.database().ref('/Order-List'); 
	this.orderList = firebase.database().ref('/orders'); 
    this.brandList = firebase.database().ref('/Brand-List'); 
    this.vendorList = firebase.database().ref('/Vendor-List'); 
    this.addProduct = firebase.database().ref('/product-List');
    this.addCategory = firebase.database().ref('/Category_List'); 
    this.customerList = firebase.database().ref('/Customer-List' );
    this.customerRole = firebase.database().ref('/Customer-Role');
	this.restaurants = firebase.database().ref('/restaurants');
	this.restaurantCategory = firebase.database().ref('/category');
	this.items = firebase.database().ref('/items');
	this.restaurantUserInfo = firebase.database().ref('/users');
	this.cord = firebase.database().ref('/cord');

  }

  // Customer and Admin App 
  //

   saveStatus(category){
	  return this.orderList.child(category.it.id).update({
		  status : category.it.status
    });
  }
  
  removeFavItem(item){
	  var uid = firebase.auth().currentUser.uid;
	  
	  console.log(item.id);
	  
	  this.restaurantUserInfo.child(uid).child("favorites").child(item.id).remove();
  }
  
  getUserFavouriteList(){
	  //console.log(id);
	  var uid = firebase.auth().currentUser.uid;
	  
	  this.favoriteItemList = this.restaurantUserInfo.child(uid).child("favorites");
	 return this.favoriteItemList;
  }
  
  getFavoriteItem(id) :any{
	  console.log(id);
	  var uid = firebase.auth().currentUser.uid;
	  
	 this.favoriteItem = this.restaurantUserInfo.child(uid).child("favorites").child(id);
	 return this.favoriteItem;
  }
  
  removeFavourite(id){
	  console.log(id);
	  var uid = firebase.auth().currentUser.uid;
	  
	 this.restaurantUserInfo.child(uid).child("favorites").child(id).remove();
	 
  }
   
  
  getItems(id): any{
	  console.log(this.items);
	  this.restaurantItems = this.items.orderByChild("categories").equalTo(id);
	  return this.restaurantItems;
	  
  }
  
  getRestaurantsList(): any{
	  console.log(this.restaurants);
	  return this.restaurants;
  }
  
  getRestaurantCategoryList(): any{
	  //console.log(this.restaurants);
	  return this.restaurantCategory;
  }
  
  getCord(): any{
	  console.log(this.restaurants);
	  return this.cord;
  }
  
   getRestaurantCategoryLists(id){
	   console.log(id);
    this.category = this.restaurantCategory.orderByChild("res_name").equalTo(id);
    return this.category;
  }
  
  getItemLists(id){
	 console.log(id);
    this.restaurantItems = this.items.orderByChild("categories").equalTo(id);
    return this.restaurantItems;
	  
  }

  getBanners(): any{
    return this.bannerList;
  }

  getCategoryList(): any {
    return this.addCategory;
  }

  getRestaurantItemList(id){
    this.productsList = this.addProduct.orderByChild("category").equalTo(id.id);
    return this.productsList;
  }
  
  
 
  
  getItemDetail(id): any{
	 console.log(id);
	 console.log(firebase.database().ref('/items').child(id));
	 console.log(this.items);
	 
    return this.items.child(id);
    
  }

  address(address: String, id:any, phone){
    var postsRef = this.customerList.child( id );
    postsRef.update({
      address: address,
      phone: phone
    });  
  }

  getProductDetail(id): any {
    return this.addProduct.child(id);
  }

  delOrder(id){
    return this.orderList.child(id).remove();
  }
  
 
  
  deleteRestaurant(id){
    return this.restaurants.child(id).remove();
  }
  
  deleteProduct(id){
	  
	  return this.items.child(id).remove();
	  
  }
  
  
  deleteCategory(id){
	  
	 return this.restaurantCategory.child(id).remove(); 
  }
  
 

  getOrderDetail(id){
    return this.orderList.child(id);
  }

  getRestaurantUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }
  
  getAllRestaurantUsers(){
	  return this.restaurantUserInfo;
  }

  getUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }

  addOrders(order:String, total:number, uid:String, payments:String, userProfiles:String){
    return this.orderList.push({
      email: uid,
      items: order,
      total: total,
      payments: payments,
      customerDetails: userProfiles,
	  status: "Queued",
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    }).then( newOrder => {
      this.orderList.child(newOrder.key).child('id').set(newOrder.key);
    });
  }
  
  
  addToFavorite(data,id){
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	  console.log("service");
	  console.log(uid);
	  console.log(data);
	  
	this.restaurantUserInfo.child(uid).child("favorites").child(id).set({
		product_id:id,
		image:data.image_firebase_url,
		name:data.name,
		price:data.price,
		categories:data.categories,
		available:data.available,
		category:data.category,
		description:data.description,
		stock:data.stock,
		market:true
    });
  }
  
  

  chargeStripe(token, currency, amount, secret_kay){
    this.getSecKey = secret_kay;
    var headers = new Headers();
    var params = new URLSearchParams();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer ' + secret_kay); 
    params.append("currency", currency);
    params.append("amount", amount);
    params.append("description", "description");
    params.append("source", token);

    return new Promise(resolve => {  
      this.http.post(  'https://api.stripe.com/v1/charges', params, { headers: headers }).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getSetting(){
    return this.setting;
  }

  getMyOrderList(id){
    console.log(id);
    this.orderLists =  this.orderList.orderByChild("email").equalTo(id);//.orderByChild("timeStamp");
    return this.orderLists;
  }

  
  getAllOrderList(){
    return this.orderList;
  }
  
  getRole(id){
    return this.customerRole.orderByChild("uid").equalTo(id);
  }

  // End of Customer and Admin Functions



  // Admin Only Functions. Delete from here for customer only App
  addBanner(banners){
    return this.bannerList.set({
    banners1: banners[0],
    banners2: banners[1],
    banners3: banners[2]
    });
  }

  addSettting(form){
    return this.setting.set({
      cod: form.cod,
      stripe: form.stripe,
      paypal: form.paypal,
      currency: form.currency,
      client_id: form.client_id,
      environment_sandbox: form.environment_sandbox,
      publish_key: form.publish_key,
      secret_kay: form.secret_kay
    });
  }

  addBrands(name:String, description:String){
    return this.brandList.push({
      name: name,
      description: description,
    }).then( newBrand => {
      this.brandList.child(newBrand.key).child('id').set(newBrand.key);
    });
  }

  addVendors(name:String, description:String){
    return this.vendorList.push({
      name: name,
      description: description,
    }).then( newVendor => {
      this.vendorList.child(newVendor.key).child('id').set(newVendor.key);
    });
  }
  
  
  addRestaurantPro(name:String, available: String, category: String,description : String, image : String , percent : String , price : String , real_price : String , stock : String , categories : String ,  downloadURL:any){
    return this.items.push({

      name: name,
      available: available,
      category:category,
      description: description,
      image: image,
	  percent: percent,
	  price : price,
	  real_price : real_price,
	  stock : stock,
	  categories : categories,
	  image_firebase_url : downloadURL,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()

    }).then( newProduct =>{
      
         this.items.child(newProduct.key).child('id').set(newProduct.key);
   }) ;
  }

  addPro(name:string, downloadURL:any, category:any, cat_id: any, image: any ){
    return this.restaurantCategory.push({

      res_name: category,
      cat_name: name,
      firebase_url:downloadURL,
      cat_id: cat_id,
      image: image,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()

    }).then( newProduct =>{
      
         this.restaurantCategory.child(newProduct.key).child('id').set(newProduct.key);
   }) ;
  }

  addCat(name:String, description:String, downloadURL:any
  ,address:String,info:String,lat:String,longitude:String,mark:String,options:String,outlet:String,phonenumber:String){
    return this.restaurants.push({

      title: name,
      description: description,
      firebase_url: downloadURL,
	  address: address,
	  info: info,
	  lat: lat,
	  long: longitude,
	  mark: mark,
	  option : options,
	  outlet : outlet,
	  phonenumber: phonenumber

    }) .then( newCategory => {
        this.restaurants.child(newCategory.key).child('id').set(newCategory.key);
    });
  }
  
 

  editCategory(name:string, description:string, id, downloadURL:any,address:String,info:String,lat:String,longitude:String,mark:String,options:String,outlet:String,phonenumber:String){
    return this.restaurants.child(id).update({
      title: name,
      description: info,
      firebase_url:downloadURL,
	  address: address,
	  info: description,
	  lat: lat,
	  long: longitude,
	  mark: mark,
	  option : options,
	  outlet : outlet,
	  phonenumber: phonenumber
    });
  }

   editBrand(name:string, description:string, id){
    return this.brandList.child(id).update({
      name: name,
      description: description
    });
  }

  editVendor(name:string, description:string, id){
    return this.vendorList.child(id).update({
      name: name,
      description: description
    });
  }

  editCustomers(displayName: String, phone:String, address: String, role:String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phone: phone,
      address: address,
     // role: role,
    }),

    this.customerRole.child(id).set({
      
      role: role
    });
  }

  getCustomerRole(){
    return this.customerRole;
  }
  
  saveRestaurantCustomers(displayName: String, phone:String, address: String, id: any){
    return this.restaurantUserInfo.child(id).update({
      displayName: displayName,
      phone: phone,
      address: address,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    });
  }
   
  saveCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phone: phone,
      address: address,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    });
  }

  editPro(title: String, category:any, res_image:any, res_name: String, image: String, id: any){
    return this.restaurantCategory.child(id).update({
      cat_name: title,
      cat_id: category,
      image: res_image,
      res_name: res_name,
      firebase_url: image,
      id: id
    }) ;
  }
  
  editRestaurantProduct(name: String, available: String, category:any, description: String, image_firebase_url: String, percent : String, price : String, real_price : String , stock : String , categories : String , image : String, id: any){
    return this.items.child(id).update({
      name: name,
      available: available,
      categories: categories,
      category: category,
      description: description,
	  image : image_firebase_url,
	  image_firebase_url: image,
	  percent: percent,
	  price : price,
	  real_price : real_price,
	  stock : stock,
      id: id
    }) ;
  }

  getProductList(): any {
    return this.addProduct;
  }

   getBrandList(): any {
    return this.brandList;
  }

   getVendorList(): any {
    return this.vendorList;
  }

  getCustomerList(): any{
    return this.customerList;
  }

  delVendor(id){
    return this.vendorList.child(id).remove();
  }

  delBrand(id){
    return this.brandList.child(id).remove();
  }

  delCat(id){
    return this.addCategory.child(id).remove();
  }

  delPro(id){
    return this.addProduct.child(id).remove();
  }
  
  deleteCustomers(id){
    return this.customerList.child(id).remove();
    
  }

  getOrderList(){
    return this.orderList.orderByChild("reverseOrder");
  }

  // End Admin Only Functions. Delete till here for customer only App



}
