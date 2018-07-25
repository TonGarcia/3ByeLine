import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, ItemSliding } from 'ionic-angular';
import { ListPage } from '../../../../pages/list/list';
import { CartPage } from '../../../../pages/cart/cart';
import { CategoryPage } from '../../../../pages/category/category';
import { WishlistPage } from '../../../../pages/wishlist/wishlist';
import { NavController , NavParams} from 'ionic-angular';
import { Values } from '../../../../providers/values';

import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'swipe-to-dismiss-layout-3',
    templateUrl: 'swipe-to-dismiss.html'
})
export class SwipeToDismissLayout3 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;
	
	 active: boolean;
    headerImage: any = "";
	favorite = false;

    constructor(public wishlist: WishlistPage,public nav: NavController, public navParams: NavParams,public values:Values) { }

    onEvent(event: string, item: any, e: any) {
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    undo = (slidingItem: ItemSliding) => {
        slidingItem.close();
    }
	
	goToItem(item){
		this.wishlist.goToItem(item);
	}

    delete = (item: any): void => {
		console.log(item);
		
		this.wishlist.removeFavItem(item);
		/**
        let index = this.data.items.indexOf(item);
        if (index > -1) {
            this.data.items.splice(index, 1);
        }
		*/
    }
}
