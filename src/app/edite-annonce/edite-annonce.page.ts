import { Annonce } from './../model/Annonce';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController, ActionSheetController,NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceDataService } from 'src/app/services/service-data.service';
@Component({
  selector: 'app-edite-annonce',
  templateUrl: './edite-annonce.page.html',
  styleUrls: ['./edite-annonce.page.scss'],
})
export class EditeAnnoncePage implements OnInit {
  urlImage:string
  data:Annonce={
    id:0,
    userId:0,
    titre:'',
    pub:'',
    image:'../assets/img/avatar.jpeg',
    dateCreation:''
  }
    constructor(private router:Router,
      private actionSheetController:ActionSheetController,
      private camera:Camera,
      private serviceData:ServiceDataService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      //params['idAnnonce']
      this.urlImage = this.serviceData.urlDataImage;
      this.getAnnonceById(params['idAnnonce']);
    });
  }
  getAnnonceById(idAnnonce:string){
    this.serviceData.getAnnonceById(idAnnonce).subscribe(data=>{
      this.data = data;
      console.log(this.data);
      
    });
  }
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
      this.data.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('erreur take photo'  + err);
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
      this.data.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
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
      this.data.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  
  editeAnnonce(){
    this.serviceData.editeAnnonce(this.data);
  }
}
