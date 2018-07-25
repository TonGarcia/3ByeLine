import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'expandable-layout-3',
  templateUrl: 'expandable.html'
})
export class ExpandableLayout3 {
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

  toggleGroup(group: any) {
    group.show = !group.show;
  }

  isGroupShown(group: any) {
    return group.show;
  }
}
