import { Annonce } from './../model/Annonce';
import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController, ActionSheetController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ServiceDataService } from 'src/app/services/service-data.service';
@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
export class AddAnnoncePage implements OnInit {
 // VARIABLES
  data:Annonce={
    id:0,
    userId:null,
    titre:'',
    pub:'',
    image:'',
    dateCreation:'2019-09-20'
  }

 // END
  constructor(private router:Router,
    private alertController:AlertController,
    private actionSheetController:ActionSheetController,
    private service:ServiceDataService,
    private camera:Camera) { }

  ngOnInit() {
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
    this.data.image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
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
  
  addAnnonce(){
    this.service.storage.get('id').then(res=>{
    this.data.userId = res;
      this.service.addAnnonce(this.data);
    });
  }
}
