import { Terrain } from './../model/Terrain';
import { Packs } from './../model/Packs';
import { Type } from './../model/Type';
import { Categorie } from './../model/Categorie';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ServiceDataService } from '../services/service-data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-terrain',
  templateUrl: './add-terrain.page.html',
  styleUrls: ['./add-terrain.page.scss'],
})
export class AddTerrainPage implements OnInit {

  // variables
  data:{
    image:string
  }= {
    image:''
  }
  categories:Categorie[] = [];
  types:Type[] = [];
  packes:Packs[] = [];
  packe:Packs = {
    id:0,
    user_id:0,
    prix_matain:0,
    prix_soir:0,
    heure_debut_soir:'',
    heure_debut_matin:'',
  }
  terrain:Terrain = {
    id:0,
    user_id:0, 
    categorie_id:0,
    type_id:0,
    pack_id:0,
    url:'',
    nom:'Terrain Annonyme',
    longeur:155,
    largeur:300,
  }
  constructor(private modalController:ModalController,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private router:Router,
    private serviceData:ServiceDataService,
    private camera:Camera) { }

  ngOnInit() {
  }
 
  ionViewWillEnter() {
    // loading data 
      this.getAllCategories();
      this.getAllPackesByClub();
      this.getAllTypes();
  }
  // photo outile

  async presentActionSheet2() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photo',
      buttons: [{
        text: 'Ouvrir camera',
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
    //this.addImageByUser(); // appel methode add photo
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
    //this.addImageByUser();
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.image = 'data:image/jpeg;base64,' + imageData;
     // this.addImageByUser(); // appel methode add photo
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
    //this.addImageByUser();
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.image = 'data:image/jpeg;base64,' + imageData;
      //this.addImageByUser(); // appel methode add photo
    }, () => {
      // Handle error
    });
  }

  addPackes(){
    this.serviceData.storage.get('id').then(id=>{
      document.getElementById('btnShowHide').click();
      this.packe.user_id = id;
      this.packe.heure_debut_matin = this.packe.heure_debut_matin.substring(11,13)+ ':00';
      this.packe.heure_debut_soir = this.packe.heure_debut_soir.substring(11,13) + ':00';
      this.serviceData.addPackes(this.packe).subscribe(res=>{
        this.packe.id = parseInt(res.id); // recuperer id de la packe enregistrer!!
        this.packes.push(this.packe);
        console.log(res.id);
      });
    })    
  }
  getAllPackesByClub(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getAllPackesByClub(id).subscribe(data=>{
        this.packes = data;
      })
    })
  }

  getAllCategories(){
    this.serviceData.getAllCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  getAllTypes(){
    this.serviceData.getAllTypes().subscribe(data=>{
      this.types = data;
    })
  }
  // add Terrain
  addTerrain(){
    this.serviceData.addTerrain(this.terrain);
  }
   // for close Page
   saveAndClose() {
    this.serviceData.storage.get("id").then(res=>{
      this.terrain.user_id = res; // recupiration  de clube id
      this.terrain.url = this.data.image;
      this.addTerrain();
      this.modalController.dismiss();
    })
  }
   // close 
   close(){
    this.modalController.dismiss();
   }
}
