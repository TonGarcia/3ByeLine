import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the Function provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Functions {

  constructor(public alert: AlertController) {

  }
  
  showAlert(title, subTitle){
    let alert = this.alert.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });

    alert.present(alert);
  } 
}

