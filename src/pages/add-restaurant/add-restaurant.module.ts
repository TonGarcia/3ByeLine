import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRestaurantPage } from './add-restaurant';

@NgModule({
  declarations: [
    AddRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRestaurantPage),
  ],
})
export class AddRestaurantPageModule {}
