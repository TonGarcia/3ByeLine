import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { ListPage } from '../../../pages/list/list';
import { CartPage } from '../../../pages/cart/cart';
import { CategoryPage } from '../../../pages/category/category';
import { ProductDetailsPage } from '../../../pages/product-details/product-details';
import { NavController , NavParams} from 'ionic-angular';
import { Values } from '../../../providers/values';

import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'parallax-layout-3',
    templateUrl: 'parallax.html'
})
export class ParallaxLayout3 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    active: boolean;
    headerImage: any = "";
	favorite = false;

    constructor(public productdetailspage:ProductDetailsPage,public nav: NavController, public navParams: NavParams,public values:Values) { 
	    console.log("Constructor");
		this.getFavoriteItem();
		
	
	}

    onEvent(event: string, item: any, e: any) {
        if (e) {
            e.stopPropagation();
        }
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        if (changes.data && changes.data.currentValue) {
            this.headerImage = changes.data.currentValue.headerImage;
        }
        this.subscribeToIonScroll();
    }

    ngAfterViewInit() {
        this.subscribeToIonScroll();
    }

    isClassActive() {
        return this.active;
    }

    subscribeToIonScroll() {
        if (this.content != null && this.content.ionScroll != null) {
            this.content.ionScroll.subscribe((d) => {
                if (d.scrollTop < 200) {
                    this.active = false;
                    return;
                }
                this.active = true;
            });
        }
    }
	
	
	addToCart(name,price,image){
		 console.log("inside");
		 console.log(name);
		 console.log(price);
		 console.log(image);
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.productdetailspage.addToCart(name,price,image);
		
	}
	
	
	
	getFavoriteItem(){
		this.productdetailspage.getFavoriteItem().on('value', (snapshot) => {
		  //this.params.data.items = snapshot.val();
		  
		  if(snapshot.val() ==null){
			  this.favorite = false;
			  console.log(this.favorite);
		  }
		  else{
			  console.log(snapshot.val());
			  
			  this.favorite = true;
			  
			 
		  }
		  //this.params.data = snapshot.val();
		  //console.log(this.params.data);
		  //console.log(this.productDetails);
		});
		
		//this.service.getItemDetail(this.navParams.get('id'))
	}
	
	
	
	addToFavourite(data){
		 console.log("inside favourite");
		 console.log(data);
		 console.log(this.favorite);
		 
					console.log("false");

		this.productdetailspage.addToFavourite(data);
		
		this.favorite = true;

		
	}
	
	removeFavourite(){
		console.log("remove");
		this.productdetailspage.removeFavourite();
		
		this.favorite = false;
	}
	

	
	goToCart(){
		this.productdetailspage.goToCart();
		//this.nav.push("CartPage");
	}
	
}
