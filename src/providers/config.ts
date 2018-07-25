import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Config {

	url: any;

  constructor() {
  	 this.url = 'http://localhost:8080/wp-content'; // Add your wordpress blog url here. you have to install json-api plugin
  	 //this.url = '/api';
 
  }

}
