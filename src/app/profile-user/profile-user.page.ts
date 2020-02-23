import { ReserverUser } from './../model/ReserverUser';
import { Terrain } from './../model/Terrain';
import { AddTerrainPage } from './../add-terrain/add-terrain.page';
import { ImageModalPage } from './../image-modal/image-modal.page';
import { Annonce } from './../model/Annonce';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../services/service-data.service';
import { Client } from '../model/Client';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {
  urlImage:string
  imageIsRead = false;
  dataCurrentClient:Client = {
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
  pieChartData;
  mesImages:{'url':string}[] = []
  mesPublications:Annonce[] = [];
  mesReservations:ReserverUser[] = [];
  mesTerrains:Terrain[] = [];
  data:{
    image:string
  }= {
    image:''
  }
  constructor(private serviceData:ServiceDataService,
    public actionSheetController: ActionSheetController,
    private router:Router,
    public popoverController: PopoverController,
    private modalController:ModalController,
    private camera:Camera) { }
  ngOnInit() {
    // get Data current user from API
    this.mesActiviteFunction();
    this.serviceData.storage.get('id').then(d=>{
      this.serviceData.getDataClient(d).subscribe(dataC=>{
          this.dataCurrentClient = dataC;
          this.urlImage = this.serviceData.urlDataImage;          
      });
    }).catch(res=>{
      console.log(res);
    })
    // fin getting data
  }
  // refresh data
  ionViewWillEnter() {
    this.mesActiviteFunction();
    this.getTerrainByClub();
    setTimeout(() => {
      this.imageIsRead = true;
    }, 2500);
  }
  showSection(section1:string,section2:string,section3:string){
    document.getElementById('section1').style.display=section1;
    document.getElementById('section2').style.display=section2;
    document.getElementById('section3').style.display=section3;
  }
  mesActiviteFunction() {
    this.getAllImageUser();
    this.showSection('block','none','none');
  }
  mesPublicationFunction(){
    this.showSection('none','block','none');
    
    this.serviceData.storage.get('id').then(id=>{
       this.serviceData.getAllAnnoceByIdUser(id).subscribe(dataAnnonce=>{
         this.mesPublications = dataAnnonce;  
       })
    });
  }

  mesClubesFunction(){
    this.showSection('none','none','block');
  }
  // mes Reservations 
  mesReservationsFunction(){
    this.showSection('none','none','block');
    this.serviceData.storage.get('id').then(id=>{
      this.getReservationByClient(id);
    })
  }

  // click option (Delete update or cancel)
  async presentActionSheet(id:string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Annonce with id : '+ id);
          // code for delete annonce 
          this.serviceData.deleteAnnonce(id).subscribe(res=>{
            if(res[0].isdelete){
              // refresh data annonce 
              this.mesPublicationFunction();
              this.serviceData.presentAlertConfirm('Cette Annonce Bien Supprimé');
            }else{
              this.serviceData.presentAlertConfirm('Cette Annonce faible Supprimé');
            }
          })
        }
      }, {
        text: 'Modifier cette publication ',
        icon: '',
        handler: () => {
          this.editeAnnonce(id);
          console.log('modifier avec succes ');
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
  // les personnes interessé par une annonce
  seePersonneInteresed(idAnnonce:string){
      this.router.navigateByUrl('tabs/per-interested/'+idAnnonce);
  }
  // les Reservation pour un terrain
  seeReservationTerrain(idTerrain:string){
    this.router.navigateByUrl('tabs/per-reserever/'+idTerrain);
  }
  // Les Reservation pour un client 
  getReservationByClient(idUser:string){
      this.serviceData.getReservationByClient(idUser).subscribe(res=>{
        this.mesReservations = res;
      })
  }
  // edit annonce  
  editeAnnonce(idAnnonce:string){
    this.router.navigateByUrl('tabs/edite-annonce/'+idAnnonce);
  }

  /// ajouter une photo à votre profile
  async presentActionSheet2() {
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

  // supprime une reservation ou bien modifier
  async presentActionSheet3(idReservation:string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Réservation',
      buttons: [{
        text: 'Supprimé',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // delete Reservation
          this.serviceData.deleteReservation({idReservation:idReservation});
          setTimeout(() => {
            this.mesReservationsFunction();
          }, 1000);
          
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
    this.addImageByUser(); // appel methode add photo
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
    this.addImageByUser();
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.image = 'data:image/jpeg;base64,' + imageData;
      this.addImageByUser(); // appel methode add photo
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
    this.addImageByUser();
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.data.image = 'data:image/jpeg;base64,' + imageData;
      this.addImageByUser(); // appel methode add photo
    }, () => {
      // Handle error
    });
  }
  // add Image 
  addImageByUser(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.addImageByUser({user_id:id,url:this.data.image});
      this.serviceData.presentAlertConfirm('votre photo bien ajouté');
      console.log('bien ajouter');
      
   });  
  }
  // get All Image buY User id 
  getAllImageUser(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getAllImageUser(id).subscribe(dataImage=>{
          this.mesImages = dataImage;
      });
   });  
  }
  // menu Controller
  seDeconnecte(){
    this.serviceData.storage.clear();
    console.log('Bien Déconnecte');
    this.router.navigateByUrl('signup');
  }
  //zoom image show image with large taille
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }
  // add terrain
  openPreviewAddTerrain() {
    this.modalController.create({
      component: AddTerrainPage,
      componentProps: {
      }
    }).then(modal => {
      modal.present();
    });
  }
  // get terrain by club id
  getTerrainByClub(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getTerrainByClub(id).subscribe(res=>{
        this.mesTerrains = res;
      })
    })
  }
  // calcule number day between two date
  dateBetweenTwoDate(date:any,time:string):number{
    let d = new Date();
    let todayDate = new Date(d.getFullYear() + '-' + (d.getMonth()+1)  + '-'+ d.getDate() + ' '+ d.getHours() + ':00:00')
    let reservationDate = new Date(date + ' ' + time)
    if (todayDate > reservationDate){
      return -1;
    } else if (todayDate < reservationDate){
      return 1;
    }
  }
  // calcule prix 
  calculateMontant(){

  }
  
}
