import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Values } from '../../providers/values';
import { Service } from '../../providers/service';
import { TranslateService } from '@ngx-translate/core';
import { ProductDetailsPage } from '../product-details/product-details';
import { EditItemPage } from '../edit-item/edit-item';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
	
	id: any;
	productsList: any;
	params:any = {};

  constructor(public nav: NavController, public navParams: NavParams, public service: Service, public values:Values, public translateService: TranslateService ) {
	  
	  this.id = navParams.data.id;
	  console.log(this.id);
	  
	  this.params.data = {
        "items" : [ {
          "favorite" : true,
          "id" : 1,
          "image" : "assets/images/avatar/0.jpg",
          "title" : "Isaac Raid"
        } ]
      }
	  
	  
	 this.params.events = {
            'onItemClick': function(item: any) {
                console.log("onItemClick");
            },
            'onFavorite': function(item) {
                item.favorite = !item.favorite;
                console.log("onFavorite");
            }
        };
		
		
		this.params.data = [];
	  
	  console.log(this.params.data.items);
	  
	  this.service.getItemLists(this.id).on('value', snapshot =>{
  		this.productsList = [];
		this.params.data.items = [];

  		snapshot.forEach( snap =>{
  			this.params.data.items.push({
          
  			id: snap.key,
			available: snap.val().available,
			categories : snap.val().categories,
			category : snap.val().category,
			description : snap.val().description,
			image_firebase_url: snap.val().image,
			percent: snap.val().percent,
			price: snap.val().price,
			real_price: snap.val().real_price,
			stock: snap.val().stock,
			favorite: false,
	        title: snap.val().name,
			name: snap.val().name,
	        image: snap.val().image_firebase_url
  			});
  		});
		
		console.log(this.params.data.items);
  	});
		

  }
  
   deleteProduct(id){
	  this.service.deleteProduct(id);
	  //this.nav.setRoot(ListPage);
  }
  
  editProduct(item){
	  this.nav.push(EditItemPage, item);
  }
  
  getProductDetails(id){
	  console.log(id);
	 this.nav.push(ProductDetailsPage,{id:id}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
	}

}
