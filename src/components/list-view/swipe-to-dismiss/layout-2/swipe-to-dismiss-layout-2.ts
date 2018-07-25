import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, ItemSliding } from 'ionic-angular';
import { CategoryPage } from '../../../../pages/category/category';
import { NavController , NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'swipe-to-dismiss-layout-2',
    templateUrl: 'swipe-to-dismiss.html'
})
export class SwipeToDismissLayout2 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    constructor(public categorypage:CategoryPage,public nav: NavController, public navParams: NavParams) { }

    onEvent(event: string, item: any, e: any) {
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    undo = (slidingItem: ItemSliding) => {
        slidingItem.close();
    }
	
	getItems(id){
	  //this.form = id;
	  console.log("inside");
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.categorypage.getItems(id);
	}
	
	deleteCategory(id){
	  console.log("inside");
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.categorypage.deleteCategory(id);
  }
  
  editCategory(item){
	  console.log("inside");
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.categorypage.editCategory(item);
  }

    delete = (item: any): void => {
        let index = this.data.items.indexOf(item);
        if (index > -1) {
            this.data.items.splice(index, 1);
        }
    }
}
