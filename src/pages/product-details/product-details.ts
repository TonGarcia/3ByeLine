import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Values } from '../../providers/values';
import { Service } from '../../providers/service';
import { TranslateService } from '@ngx-translate/core';
//import { CartPage } from '../cart/cart';
import { CartPage } from '../cart/cart';
import { ListPage } from '../list/list';



/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
	
	id: any;
	productsList: any;
	productDetails: any;
	params:any = {};

  product: any;
  cartItem: any = {};
  quantity: any;
  favoriteItem: any;

  constructor(public nav: NavController, public navParams: NavParams, public service: Service, public values:Values, public translateService: TranslateService) {
	  
	  this.quantity = "1";
	  
	  this.id = navParams.data.id;
	  console.log(this.id);
	  this.params.data = {
      "headerImage" : "assets/images/background-small/4.jpg",
      "headerTitle" : "Product",
      "items" : [ {
        "button" : "$63.99",
        "category" : "NEW OFFER",
		"favorite" : true,
        "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "id" : 1,
        "productDescriptions" : [ {
          "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "id" : 1
        }, {
          "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "id" : 2
        }, {
          "description" : "passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum",
          "id" : 3
        }, {
          "description" : "passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum",
          "id" : 4
        } ],
        "subtitle" : "Available Now",
        "title" : "Super & Black"
      } ],
      "shareIcon" : "more"
    }


	 this.params.events = {
        'onProceed': function (item: any) {
            console.log("onProceed");
        },
        'onShare': function (item: any) {
            console.log("onShare");
        },
        'onItemClick': function (item: any) {
            console.log("onItemClick");
        },
		'onFavorite': function(item) {
                item.favorite = !item.favorite;
                console.log("onFavorite");
            }
    };
	
	this.params.data = [];
	
	console.log(this.params.data.items);
	console.log(this.navParams.get('id'));
	  
	 this.service.getItemDetail(this.navParams.get('id')).on('value', (snapshot) => {
		  //this.params.data.items = snapshot.val();
		  console.log(snapshot.val());
		  this.params.data = snapshot.val();
		  console.log(this.params.data);
		  //console.log(this.productDetails);
		});
	 console.log(this.params.data.items); 
  }
  
 
  
  addToFavourite(data){
	  console.log(data);
	  this.service.addToFavorite(data,this.navParams.get('id'));
  }
  
  removeFavourite(){
	  console.log("product detail remove");
	  this.service.removeFavourite(this.id);
  }
  
  getFavoriteItem(){
	  
	 console.log("favorite");
	 console.log(this.id);
	 this.favoriteItem = this.service.getFavoriteItem(this.id);
	 return this.favoriteItem;
  }  

  
  addToCart(name, price, image){
 
      var itemAdded = false;
      for(let item in this.service.cart.line_items){
        if(this.id == this.service.cart.line_items[item].product_id){
          this.service.cart.line_items[item].quantity += 1;
		  
		  console.log(this.service.cart.line_items[item].quantity);
          this.service.proqty[this.id] += 1;
		  console.log(this.service.proqty[this.id]);
		  
          this.service.total += parseFloat(this.service.cart.line_items[item].price);
		  
		  console.log(this.service.total);
          this.values.qty += 1;
		  
		  console.log(this.values.qty);
          var itemAdded = true;
		  console.log(this.service.cart.line_items);
        }
      }

      if(!itemAdded){
		  console.log(itemAdded);
        this.cartItem.product_id = this.id;
		console.log(this.cartItem.product_id );
		
        this.cartItem.quantity = 1;
        this.service.proqty[this.id] = 1;
		
		console.log(this.service.proqty[this.id]);
        this.cartItem.name = name;
        this.cartItem.image = image;
        this.cartItem.price = price;
        this.service.total += parseFloat(price);
		console.log(this.service.total);
        this.values.qty += 1;
		console.log(this.values.qty);
        this.service.cart.line_items.push(this.cartItem);
        console.log(this.service.cart.line_items);
      }

      this.cartItem = {};

  }
  
  goToCart(){
	  this.nav.push(CartPage);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
