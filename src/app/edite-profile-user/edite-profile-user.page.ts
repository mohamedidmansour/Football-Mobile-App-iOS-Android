import { ActionSheetController } from '@ionic/angular';
import { Client } from './../model/Client';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-edite-profile-user',
  templateUrl: './edite-profile-user.page.html',
  styleUrls: ['./edite-profile-user.page.scss'],
})
export class EditeProfileUserPage implements OnInit {

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
  urlImage:string
  myphoto: any;
  imageIsChange = false
  constructor(private serviceData:ServiceDataService,
              private camera:Camera,
              private actionSheetController:ActionSheetController) { }

  ngOnInit() {
    this.urlImage = this.serviceData.urlDataImage
  }

  ionViewWillEnter() {
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getDataClient(id).subscribe(data=>{
          this.data = data
          console.log(data);
          
          if(data.type == 'client'){
              document.querySelectorAll('.club').forEach(_data=>{
                  _data.remove();
              });
          }else{
            document.querySelectorAll('.client').forEach(_data=>{
              _data.remove();
          });
          }
      })
    })
  }
  takePhoto(){
    this.imageIsChange = true;
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
    this.imageIsChange = true;
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
  this.imageIsChange = true;
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

  modifierInfo(){
    this.serviceData.editUserData(this.data,this.imageIsChange).subscribe(res=>{
      console.log(res);
    });
  }

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

}
