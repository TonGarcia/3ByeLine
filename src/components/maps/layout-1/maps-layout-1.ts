import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'maps-layout-1',
    templateUrl: 'maps.html'
})
export class MapsLayout1 {
    @Input() data: any;
    @Input() events: any;
    @ViewChild(Content)
    content: Content;

    active: boolean;

    constructor() { }

    onEvent(event: string, index: number, e: any) {
        if (this.events[event]) {
            this.events[event](index);
        }
        console.log(event);
    }

     onStarClass(items: any, index: number, e: any) {
        for (var i = 0; i < items.length; i++) {
        items[i].isActive = i <= index;
        }
        this.onEvent("onRates", index, e);
    };

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.subscribeToIonScroll();
    }

    ngAfterViewInit() {
        this.subscribeToIonScroll();
    }

    ngAfterViewChecked() {
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
