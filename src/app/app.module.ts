import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CategoryPage } from '../pages/category/category';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { CartPage } from '../pages/cart/cart';
import { AddressPage } from '../pages/address/address';
import { RegisterPage } from '../pages/register/register';
import { MyorderPage } from '../pages/myorder/myorder';
import { OrderDetailsPage } from '../pages/order-details/order-details';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { MapPage } from '../pages/map/map';
import { AddRestaurantPage } from '../pages/add-restaurant/add-restaurant';
import { EditRestaurantPage } from '../pages/edit-restaurant/edit-restaurant';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { EditCategoryPage } from '../pages/edit-category/edit-category';
import { AddItemPage } from '../pages/add-item/add-item';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { CustomerDetailsPage } from '../pages/customer-details/customer-details';
import { AllOrdersPage } from '../pages/all-orders/all-orders';
import { OrderStatusChangePage } from '../pages/order-status-change/order-status-change';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';



/*----------------PROVIDERS & NATIVES---------------------*/

import { Auth } from '../providers/auth';
import { Config } from '../providers/config';
import { Values } from '../providers/values';
import { Service } from '../providers/service';
import { Facebook } from '@ionic-native/facebook';
import { WpService } from '../providers/wp-service';

//import { GooglePlus } from '@ionic-native/google-plus';

import { Functions } from '../providers/functions/functions';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Push } from '@ionic-native/push';
import { PayPal } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { NativeStorage } from '@ionic-native/native-storage';
//import { Crop } from '@ionic-native/crop';


import { LoginLayout1 } from '../components/login/layout-1/login-layout-1';
import { GoogleCardLayout1 } from '../components/list-view/google-card/layout-1/google-card-layout-1';
import { ExpandableLayout2 } from '../components/list-view/expandable/layout-2/expandable-layout-2';
import { AppearanceAnimationLayout2 } from '../components/list-view/appearance-animation/layout-2/appearance-animation-layout-2';
import { SwipeToDismissLayout2 } from '../components/list-view/swipe-to-dismiss/layout-2/swipe-to-dismiss-layout-2';
import { SwipeToDismissLayout3 } from '../components/list-view/swipe-to-dismiss/layout-3/swipe-to-dismiss-layout-3';
import { ParallaxLayout3 } from '../components/parallax/layout-3/parallax-layout-3';
import { ParallaxLayout4 } from '../components/parallax/layout-4/parallax-layout-4';
import { AppearanceAnimationLayout4 } from '../components/list-view/appearance-animation/layout-4/appearance-animation-layout-4';
import { AppearanceAnimationLayout5 } from '../components/list-view/appearance-animation/layout-5/appearance-animation-layout-5';
import { ParallaxLayout2 } from '../components/parallax/layout-2/parallax-layout-2';

import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	LoginLayout1,
	GoogleCardLayout1,
	ExpandableLayout2,
	CategoryPage,
	AppearanceAnimationLayout2,
	SwipeToDismissLayout2,
	ProductsPage,
	ParallaxLayout3,
	ProductDetailsPage,
	ParallaxLayout4,
	CartPage,
	AddressPage,
	RegisterPage,
	MyorderPage,
	OrderDetailsPage,
	MyProfilePage,
	WishlistPage,
	SwipeToDismissLayout3,
	AppearanceAnimationLayout4,
	ParallaxLayout2,
	MapPage,
	AddRestaurantPage,
	EditRestaurantPage,
	AddCategoryPage,
	EditCategoryPage,
	AddItemPage,
	EditItemPage,
	AppearanceAnimationLayout5,
	CustomerListPage,
	CustomerDetailsPage,
	AllOrdersPage,
	OrderStatusChangePage
  ],
  imports: [
    BrowserModule,
	HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	LoginLayout1,
	GoogleCardLayout1,
	ExpandableLayout2,
	CategoryPage,
	AppearanceAnimationLayout2,
	SwipeToDismissLayout2,
	ProductsPage,
	ParallaxLayout3,
	ProductDetailsPage,
	ParallaxLayout4,
	CartPage,
	AddressPage,
	RegisterPage,
	MyorderPage,
	OrderDetailsPage,
	MyProfilePage,
	WishlistPage,
	SwipeToDismissLayout3,
	AppearanceAnimationLayout4,
	ParallaxLayout2,
	MapPage,
	AddRestaurantPage,
	EditRestaurantPage,
	AddCategoryPage,
	EditCategoryPage,
	AddItemPage,
	EditItemPage,
	AppearanceAnimationLayout5,
	CustomerListPage,
	CustomerDetailsPage,
	AllOrdersPage,
	OrderStatusChangePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Auth,
    Config,
    NativeStorage,
    Values,
    Service,
    Facebook,
    WpService,
    Functions,
    //GooglePlus,
    SocialSharing,
   // TwitterConnect,
    Push,
    PayPal,
    Stripe, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	Geolocation,
	BackgroundGeolocation,
    LocationTrackerProvider
  ]
})
export class AppModule {}
