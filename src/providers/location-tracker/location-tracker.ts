import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import { Service } from '../service';

import firebase from 'firebase';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform } from 'ionic-angular';



declare var google;
declare var map;
declare var infoWindow;

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
	
	public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public timestamp: any; 
  userList: any;
 
  constructor(public zone: NgZone, public http: HttpClient,public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation,public service: Service) {
 
  }
 
  startTracking() {
		// Background Tracking
		
	  let map : any;
	  let infoWindow : any;
	  let beachMarker: any;
	  let image: any;
	  
	  
		
 
		  let config = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 10,
			debug: true,
			interval: 2000
		  };


			

		 
		  this.backgroundGeolocation.configure(config).subscribe((location) => {
		 
			console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
		 
			// Run update inside of Angular's zone
			this.zone.run(() => {
			  this.lat = location.latitude;
			  this.lng = location.longitude;
			});
		 
		  }, (err) => {
		 
			console.log(err);


					  navigator.geolocation.getCurrentPosition(function(position) {
					    var pos = {
					      lat: position.coords.latitude,
					      lng: position.coords.longitude
					    };
					    

		  map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: position.coords.latitude, lng: position.coords.longitude},
			  zoom: 6
			});

			});

					
		 
		  });
		 
		  // Turn ON the background-geolocation system.
		  this.backgroundGeolocation.start();
		 
		 
		  // Foreground Tracking
		 
		let options = {
		  frequency: 3000,
		  enableHighAccuracy: true
		};
		 
		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
		 
		  console.log(position);
		  
		  
				var uid = firebase.auth().currentUser.uid;
	  
				  console.log("service");
				  console.log(uid);
				  
				firebase.database().ref('/users').child(uid).update({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					userTimeStamp: position.timestamp
				});
				
				
				//var uid = firebase.auth().currentUser.uid;
	  
				  //console.log("service");
				  //console.log(uid);
	  
	  
				firebase.database().ref('/users').child(uid).on('value', snapshot =>{
						this.userList = snapshot.val();
								
				});
				
			//===========================================================================================	
				map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: this.userList.lat, lng: this.userList.lng},
					zoom: 6
				});


				image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
				  beachMarker = new google.maps.Marker({
				  position: {lat: this.userList.lat, lng: this.userList.lng},
				  map: map,
				  icon: image
				});
		
				var posUser = {
					  lat: this.userList.lat,
					  lng: this.userList.lng
					};
		
		
			
					infoWindow = new google.maps.InfoWindow;
				
					infoWindow.setPosition(posUser);
					infoWindow.setContent('Thats2 your Location.');
					infoWindow.open(map);
					map.setCenter(posUser);
					
					
						 // Additional Markers //
         var markers = [];
		 var distance = [];
        // infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: map,
                animation: google.maps.Animation.DROP,
                title: info.title
            });
            marker.content = '<div class="infoWindowContent">' + info.info + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open(map, marker);
            });
            markers.push(marker);
        }
		
		
		this.service.getRestaurantsList()
		   .on('value', function (snapshot) {
			
			
			snapshot.forEach(function(childSnapshot) {
					// key will be "fred" the first time and "barney" the second time
				    console.log(childSnapshot.val());
					console.log(childSnapshot.key);
					var key = childSnapshot.key;
					
					var val = childSnapshot.val();
					//var val2 = childSnapshot.val();
					
					//var arr2 = Object.keys(val);
					//var key = arr2[0];
					//console.log(key);
					
					///console.log(childSnapshot.key());
		
								createMarker(childSnapshot.val());

								
								console.log(childSnapshot.val().lat);
								console.log(childSnapshot.val().long);
								//console.log(childSnapshot.val().title);
						
							 distance.push(calcDistance(childSnapshot.val().lat,childSnapshot.val().long,childSnapshot.key) + " kilometers away");
						
								
				});
			
			
		
		});
		
		
		function calcDistance(destination,destination1,res_id){
			 
			  var userLists: any;
		
			firebase.auth().onAuthStateChanged(function(user) {
					  if (user) {
						uid=user.uid;
						
						
					  //this.service.getRestaurantUserProfile(uid).on('value', snapshot =>{
						  firebase.database().ref('/users').child(uid).on('value', snapshot =>{

					var cord = snapshot.val();
					
					console.log(cord.lat);
						console.log(cord.lng);
						
						
						
						
						var p1 = new google.maps.LatLng(destination, destination1);
						
						
						var p2 = new google.maps.LatLng(cord.lat, cord.lat);
					
						console.log("distance is "+google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000);

						var distanceBetween= (google.maps.geometry.spherical.computeDistanceBetween(p1, p2))/1000;
						console.log(distanceBetween);
						
						firebase.database().ref('/cord').child(uid).child(res_id).update({    // set
						 item_dis : distanceBetween.toFixed(2) + "km away"
					  });
						
						return distanceBetween;
					});	
			
		
					}
				});
				
			
		  }
			
			//===========================================================================================
		 
		  // Run update inside of Angular's zone
		  this.zone.run(() => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
			this.timestamp = position.timestamp;
		  });
		 
		});
  }
 
  stopTracking() {
		console.log('stopTracking');
 
	  this.backgroundGeolocation.finish();
	  this.watch.unsubscribe();
 
  }


}
