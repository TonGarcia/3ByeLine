import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { ListPage } from '../../../../pages/list/list';
import { CategoryPage } from '../../../../pages/category/category';
import { ProductDetailsPage } from '../../../../pages/product-details/product-details';
import { ProductsPage } from '../../../../pages/products/products';
import { NavController , NavParams} from 'ionic-angular';



@IonicPage()
@Component({
    selector: 'appearance-animation-layout-2',
    templateUrl: 'appearance-animation.html'
})
export class AppearanceAnimationLayout2 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    animateItems = [];
    animateClass: any;

    constructor(public productspage:ProductsPage,public nav: NavController, public navParams: NavParams) {
        this.animateClass = { 'fade-in-right-item': true };
    }
	
	getProductDetails(id){
		console.log(id);
		this.productspage.getProductDetails(id);
		
	}
	
	 deleteProduct(id){
	  this.productspage.deleteProduct(id);
  }

  
   editProduct(item){
	  this.productspage.editProduct(item);
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
        let that = this;
        that.data = changes['data'].currentValue;
        if (that.data && that.data.items) {
            that.animateItems = [];
            for (let i = 0; i < that.data.items.length; i++) {
                setTimeout(function () {
                    that.animateItems.push(that.data.items[i]);
                }, 200 * i);
            }
        }
    }
}
