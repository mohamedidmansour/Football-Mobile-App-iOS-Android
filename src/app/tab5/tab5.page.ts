import { PositionClub } from './../model/PositionClub';
import { ServiceDataService } from './../services/service-data.service';
import { ActivatedRoute } from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare var google;
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  Position:PositionClub
  
  @ViewChild('mapElement',{static:true}) mapNativeElement: ElementRef;
  constructor(private router:ActivatedRoute,
              private service:ServiceDataService) { }

  ngOnInit() {
      this.getPositionClub()
  }
  ionViewWillEnter() {
    this.getPositionClub()
  }
  getPositionClub(){
    this.router.params.subscribe(params => {
      this.service.getPositionClub(params['idClub']).subscribe(res=>{
        this.Position = res[0]
        console.clear()
        console.log(this.Position);
        
        this.myMap()
      })
    })
  }
  myMap() {    
    var markers = [] 
    var myLatlng = {
        lat: parseFloat(this.Position.laltitude),
        lng: parseFloat(this.Position.longitude)
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: myLatlng
    });
    var marker = new google.maps.Marker({position: myLatlng, map: map,
      label: {
        color: 'white',
        fontWeight: 'bold',
        text: 'Position'
      },
      icon: {
        labelOrigin: new google.maps.Point(11, 50),
        url: '../../assets/img/placeholder.png',
        size: new google.maps.Size(25, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(11, 40),
      }
    });
    //marker.showInfoWindow();
    markers.push(marker)
    // map.addListener('click', function(e) {
    //    //Loop through all the markers and remove
    //    if (markers) {
    //     markers.map(d=>{
    //         d.setMap(null);
    //     })
    //   }
    //   var m = new google.maps.Marker({
    //     position: e.latLng,
    //     map: map
    //   })
    //   markers.push(m);
    //   map.panTo(e.latLng);
    //    console.log(m.getPosition().lat());
    //    console.log(m.getPosition().lng()); 
    // });
}
    

}
