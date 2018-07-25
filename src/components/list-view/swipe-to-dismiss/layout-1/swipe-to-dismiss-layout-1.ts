import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content, ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'swipe-to-dismiss-layout-1',
    templateUrl: 'swipe-to-dismiss.html'
})
export class SwipeToDismissLayout1 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    constructor() { }

    onEvent(event: string, item: any, e: any) {
        if (this.events[event]) {
            this.events[event](item);
        }
    }

    undo = (slidingItem: ItemSliding) => {
        slidingItem.close();
    }

    delete = (item: any): void => {
        let index = this.data.items.indexOf(item);
        if (index > -1) {
            this.data.items.splice(index, 1);
        }
    }
}
