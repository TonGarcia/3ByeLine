Installation Guide

ionic start myApp sidemenu --v3
cd myApp

	ionic cordova plugin add cordova-plugin-x-socialsharing
	npm install --save @ionic-native/social-sharing

	ionic cordova plugin add cordova-plugin-nativestorage
	npm install --save @ionic-native/native-storage

	ionic cordova plugin add com.paypal.cordova.mobilesdk
	npm install --save @ionic-native/paypal

	ionic cordova plugin add cordova-plugin-stripe
	npm install --save @ionic-native/stripe


	npm install @ngx-translate/core@9.0.2 @ngx-translate/http-loader@0.1.0 --save

	npm install firebase@4.8.0 --save

	npm install promise-polyfill --save-exact


	ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="250945452107301" --variable APP_NAME="JobApp"
	npm install --save @ionic-native/facebook

	ionic cordova plugin add phonegap-plugin-push --variable SENDER_ID=692778962096
	npm install --save @ionic-native/push

	npm install --save ion-affix
	npm install @agm/core


	ionic cordova plugin add cordova-plugin-geolocation
	npm install --save @ionic-native/geolocation

	ionic cordova plugin add cordova-plugin-mauron85-background-geolocation
	npm install --save @ionic-native/background-geolocation

	npm install @ionic/app-scripts@3.1.6 --save-dev

Go to app.component.ts and initialize Firebase, for that you need following config data
from firebase console:


	apiKey: "<API_KEY>",
	authDomain: "<PROJECT_ID>.firebaseapp.com",
	databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
	storageBucket: "<BUCKET>.appspot.com",
	messagingSenderId: "<SENDER_ID>",


Add sender Id in app.component.ts file


BACKEND INSTALLATION GUIDE 

Backend Install Guide

if necessary ===> “npm install -g @angular/cli”

if necessary ===> “npm install firebase angularfire2 -—save”

if necessary ===> “npm install firebase angularfire2 angular2-flash-messages -—save”

1) First—> Extract SuperAdminMulti.rar file

2) Second—> Open cmd type “cd Multirestaurant-Backend”

3) Third—> type “ng serve” in cmd