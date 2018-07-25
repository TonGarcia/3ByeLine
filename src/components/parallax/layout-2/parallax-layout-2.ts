import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { ListPage } from '../../../pages/list/list';
import { CartPage } from '../../../pages/cart/cart';
import { CategoryPage } from '../../../pages/category/category';
import { ProductDetailsPage } from '../../../pages/product-details/product-details';
import { NavController , NavParams} from 'ionic-angular';
import { Values } from '../../../providers/values';

@IonicPage()
@Component({
    selector: 'parallax-layout-2',
    templateUrl: 'parallax.html'
})
export class ParallaxLayout2 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    active: boolean;
    headerImage:any = "";

	favorite = false;

    constructor(public nav: NavController, public navParams: NavParams,public values:Values) { }

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
                if (d.scrollTop < 200 ) {
                    this.active = false;
                    return;
                }
                this.active = true;
            });
        }
    }
}
