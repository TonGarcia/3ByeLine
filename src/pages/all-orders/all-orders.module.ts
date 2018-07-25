import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllOrdersPage } from './all-orders';

@NgModule({
  declarations: [
    AllOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AllOrdersPage),
  ],
})
export class AllOrdersPageModule {}
