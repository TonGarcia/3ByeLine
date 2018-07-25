import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';




/*
  Generated class for the Service provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Values {

  avatar: any = "assets/images/person.png";
  listview: boolean = true;
  count: number = 0;
  currency: any = "USD";
  role: any = "CUSTOMER";
  price: any;
  cart: Array<number> = [];
  qty: number = null;
  isLoggedIn: boolean = false;
  customerList: any;
  userRole: any = "";
  constructor( public translateService: TranslateService) {

 }

 changeRoll(role){
  
  if(role ==  "Vendor"){
    this.role = "Vendor";
  }

  else if(role == "Customer"){
    this.role = "Customer";
  }

  else if(role == "Admin"){
    this.role = "Admin";
  }
  console.log()
}

changecurrency(curr){
  if(curr ==  "USD"){
    this.currency = "USD";
  }

  else if(curr == "INR"){
    this.currency = "INR";
  }

  else if(curr == "EUR"){
    this.currency = "EUR";
  }

  else if(curr == "KWD"){
    this.currency = "KWD";
  }

  
}


changeLanguage(event){
 if(event == 'arabic'){
    this.translateService.use('arabic');
    console.log(event);
  }
  else if(event == 'english'){
    this.translateService.use('english');
     console.log(event);
  }
   else if(event == 'russian'){
    this.translateService.use('russian');
     console.log(event);
  }
   else if(event == 'french'){
    this.translateService.use('french');
     console.log(event);
  }
   else if(event == 'hindi'){
    this.translateService.use('hindi');
     console.log(event);
  }
   else if(event == 'chinese'){
    this.translateService.use('chinese');
     console.log(event);
  }
}


}

