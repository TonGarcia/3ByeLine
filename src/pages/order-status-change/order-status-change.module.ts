import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderStatusChangePage } from './order-status-change';

@NgModule({
  declarations: [
    OrderStatusChangePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderStatusChangePage),
  ],
})
export class OrderStatusChangePageModule {}
