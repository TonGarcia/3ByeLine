import { Component, Input } from '@angular/core';
import { HomePage } from '../../../pages/home/home';
import { RegisterPage } from '../../../pages/register/register';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { ListPage } from '../../../pages/list/list';


import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'login-layout-1',
    templateUrl: 'login.html'
})
export class LoginLayout1 {
    @Input() data: any;
    @Input() events: any;

	
	  error: any;
	  
	  form: any; 
	  userProfile: any = null;
	  isLoggedIn: boolean = false;
	  customerList:any;
	  currentUser: any;
	  userProfiles: any = null;
	  role: any;
	  errorRegisterMessage: any;
	  errorSigninMessage: any;
	  disableRegister: boolean = false;
	  disableLogin: boolean = false;
	  signup: boolean = false;
	  _showSignup: boolean = false;
	  buttonText: any = "Register Account";
	  HeaderText: any ="Login";	
    public username: string;
    public password: string;

    constructor(public nav: NavController, public navParams: NavParams,public homepage:HomePage) { 
		this.form = {};
		
		
	firebase.auth().onAuthStateChanged(user => {
	  if (user) {
		// User is signed in.
		
		console.log(user);
		this.currentUser = user;
		
		console.log("New user" ,this.currentUser);
		
	
		
		this.homepage.goToList();		
		
		//this.navs.push(ListPage,this.currentUser);
		//console.log(this.values.isLoggedIn);
		//this.service.goToList();
		//this.values.isLoggedIn = true;
		//this.nav.setRoot(ListPage);
		 //this.nav.setRoot(ListPage);
		 //this.nav.setRoot(ListPage);
		//this.nav.push(ListPage, this.currentUser);
		
		
	  } else {
		// No user is signed in.
		
		console.log("loggedd out none");
	  }
	});
	}

    onEvent = (event: string): void => {
        if (this.events[event]) {
            this.events[event]({
                'username': this.username,
                'password': this.password
            });
        }
    }
	
	login(){
			console.log(this.form.email);
			console.log(this.form.password);
			this.homepage.login(this.form.email,this.form.password);		
	}
	
	facebookLogin(){
		console.log("Facebook login");
		this.homepage.facebookLogin();	
		
	}
	
	goToRegister(){
		
		
			this.homepage.goToRegister();		
	}

}
