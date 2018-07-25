import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRestaurantPage } from './edit-restaurant';

@NgModule({
  declarations: [
    EditRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRestaurantPage),
  ],
})
export class EditRestaurantPageModule {}
