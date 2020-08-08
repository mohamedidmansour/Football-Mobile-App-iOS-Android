import { Client } from './../../model/Client';
import { AlertController,ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ActivatedRoute } from '@angular/router';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare var google;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// BY Mohamed IDMANSOUR 
// BY Mohamed IDMANSOUR 
export class LoginPage implements OnInit {
  // attributs
  data:Client = {
    id:0,
    nom:'',
    prenom:'',
    brand_name:'',
    email:'',
    password:'',
    dateNaissance:'',
    tel:'',
    adresse:'',
    laltitude:0,
    longitude:0,
    ville:'',
    coverture:'',
    url:'',
    type:''
  }
  myphoto: any;
  
  @ViewChild('mapElement',{static:true}) mapNativeElement: ElementRef;
  constructor(private router:Router,
              private alertController:AlertController,
              private actionSheetController:ActionSheetController,
              private service:ServiceDataService,
              private camera:Camera
            ) {
    this.presentAlertConfirm();
   }

  ngOnInit() {
  }
  
  seConnecter(){
      this.router.navigateByUrl('signup');
      console.log('navigate to signup page ');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'avez-vous!',
      message: '<strong>Êtes-vous club ou bien un client ??</strong>',
      buttons: [
        {
          text: 'club',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Vous Êtes club');
            this.data.type = 'club';
            document.querySelectorAll('.client').forEach(data=>{
                data.remove();
            });
            this.myMap()
          }
        }, {
          text: 'client',
          handler: () => {
            console.log('Vous Êtes client');
            this.data.type = 'client';
            document.querySelectorAll('.club').forEach(data=>{
              data.remove();
          });
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.presentAlertConfirm();
      event.target.complete();
    }, 2000);
  }

  // open groups for camera
  // openOption if on click more icon
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photo',
      buttons: [{
        text: 'Ouvrir camera ',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.takePhoto();
          console.log('camera click');
        }
      }, {
        text: 'Image Gallery',
        icon: 'attach',
        handler: () => {
         this.getImage();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(){
    const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    this.data.url = 'data:image/jpeg;base64,' + imageData;
  }, () => {
    console.log('erreur take photo');
  });
  /* this.data.url = this.myphoto;
    console.log(this.data.url);*/
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.url = 'data:image/jpeg;base64,' + imageData;
    }, () => {
      // Handle error
    });
  }

cropImage() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    allowEdit:true,
    targetWidth:300,
    targetHeight:300
  }

  this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.url = 'data:image/jpeg;base64,' + imageData;
    }, () => {
      // Handle error
    });
  }
  
  inscrireClient(){
    this.data.dateNaissance = this.data.dateNaissance.substring(0, 10);
    this.service.inscrire(this.data);
    //console.log(this.data);
  }

  // get Position of map
  myMap() {    
    var markers = [] 
    var myLatlng = {
        lat: 31.620282,
        lng: -8.044550
    };
    this.data.laltitude = 31.620282
    this.data.longitude = -8.044550
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: myLatlng
    });
    var marker = new google.maps.Marker({position: myLatlng, map: map
      /*,
      label: {
        color: 'white',
        fontWeight: 'bold',
        text: 'Position',
      },
      icon: {
        labelOrigin: new google.maps.Point(11, 50),
        url: '../../assets/img/placeholder.png',
        size: new google.maps.Size(25, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(11, 40),
      }*/
    });
    //marker.showInfoWindow();
    markers.push(marker)
    map.addListener('click', (e)=>{
       //Loop through all the markers and remove
       if (markers) {
        markers.map(d=>{
            d.setMap(null);
        })
      }
      var m = new google.maps.Marker({
        position: e.latLng,
        map: map
      })
      markers.push(m);
      map.panTo(e.latLng);
       console.log(m.getPosition().lat());
       console.log(m.getPosition().lng()); 
       this.data.laltitude = m.getPosition().lat()
       this.data.longitude = m.getPosition().lng()
    });
  }
}
