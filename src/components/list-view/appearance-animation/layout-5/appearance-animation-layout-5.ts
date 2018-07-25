import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { CustomerListPage } from '../../../../pages/customer-list/customer-list';

@IonicPage()
@Component({
    selector: 'appearance-animation-layout-5',
    templateUrl: 'appearance-animation.html'
})
export class AppearanceAnimationLayout5 {
    @Input() data: any;
    @Input() events: any;

    @ViewChild(Content)
    content: Content;
    animateItems = [];
    animateClass: any;

    constructor(public customerlist : CustomerListPage) {
        this.animateClass = { 'zoom-in': true };
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
        console.log('ngOnChanges');
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
	
	getCustomerDetails(item){
		this.customerlist.getCustomerDetails(item);
	}
}
