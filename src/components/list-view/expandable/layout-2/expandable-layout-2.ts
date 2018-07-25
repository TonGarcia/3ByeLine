import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { ListPage } from '../../../../pages/list/list';
import { CategoryPage } from '../../../../pages/category/category';
import { NavController , NavParams} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'expandable-layout-2',
  templateUrl: 'expandable.html'
})
export class ExpandableLayout2 {
  @Input() data: any;
  @Input() events: any;
  @ViewChild(Content)
  content: Content;
  form: any;

  constructor(public listpage:ListPage,public nav: NavController, public navParams: NavParams) { 
	this.form = {};
  }

  onEvent(event: string, item: any, e: any) {
    if (this.events[event]) {
      this.events[event](item);
    }
  }

  onStarClass(items: any, index: number, e: any) {
    for (var i = 0; i < items.length; i++) {
      items[i].isActive = i <= index;
    }
    this.onEvent("onRates", index, e);
  };

  toggleGroup(group: any) {
    group.show = !group.show;
  }

  isGroupShown(group: any) {
    return group.show;
  }
  
  getCategories(id){
	  //this.form = id;
	  console.log("inside");
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.listpage.getCategory(id);
  }
  
  deleteRestaurant(id){
	  console.log("inside");
	  //this.nav.push('CategoryPage', {id:id});
	  
	  this.listpage.deleteRestaurant(id);
  }
  
  editRestaurant(restaurant){
	  
	  this.listpage.editRestaurant(restaurant);
     
  }
  
}
