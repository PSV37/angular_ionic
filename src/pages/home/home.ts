import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   @ViewChild('map') mapElement: ElementRef;
    map:any;
  constructor(public navCtrl: NavController, private geolocation : Geolocation) {

  }

  ionViewDidLoad() {
    console.log(this.mapElement)
    //this.displayMap();
    this.loadMap()
  }


  // displayMap() {
  //   const location = new google.maps.LatLng('18.520430','73.856744');

  //   const options = {
  //     center:location,
  //     zoom : 10,
  //   }

  //   const map = new google.maps.Map(this.mapElement.nativeElement, options);
  //   this.makeMarker(location, map);
  // }


  makeMarker(position, map) {
    return new google.maps.Marker({
      position,
      map,
    })

  }


  loadMap() {
   this.geolocation.getCurrentPosition().then(( position ) => {
     let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
     let mapOption = {
       center : location,
       zoom : 10,
       mapTypeId : 'roadmap',
     }

     let map = new google.maps.Map(this.mapElement.nativeElement, mapOption);
   }, 
    (error) => {
      console.log('error occured');
    })
  }

  addMarker() {
    let marker = new google.maps.Marker({
     /// position:center,
      map:this.map,
    });
    console.log('clicked maule');
    let content = 'my new postion';
    this.addInfoWindow(marker, content);
  }


  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content:content,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map,marker);
    })
  }


}
