import { ImageModalPage } from './../image-modal/image-modal.page';
import { TerrainDetail } from './../model/TerrainDetail';
import { Router } from '@angular/router';
import { Client } from './../model/Client';
import { AnnonceInfo } from './../model/AnnonceInfo';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceDataService } from '../services/service-data.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll,null) infiniteScroll: IonInfiniteScroll;
  data = false;
  dataAnnonce: AnnonceInfo[] = [];
  dataUsersAdded:Client[] = [];
  allImageUser:Client[] = []
  urlImage: string;
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
  allTerrainWithDetail:TerrainDetail[] = [];

  constructor(public actionSheetController: ActionSheetController,
              private alertController:AlertController,
              private camera: Camera,
              private router:Router,
              private serviceData:ServiceDataService,
              private modalController:ModalController) { }

  ngOnInit() {
    setTimeout(() => {
        this.data = true;
        this.serviceData.storage.get('id').then(d=>{
          if(d){
            this.serviceData.getDataClient(d).subscribe(dataC=>{
              this.dataCurrentClient = dataC;
              this.urlImage = this.serviceData.urlDataImage;
              this.getAllAnnoce();
              this.getAllClient(); // get all image of user
            });
          }else{
              this.router.navigateByUrl('signup');
          }
        })
    }, 2500);
  }

  ionViewWillEnter() {
    this.serviceData.storage.get('id').then(d=>{
      if(d){
        this.serviceData.getDataClient(d).subscribe(dataC=>{
          this.dataCurrentClient = dataC;
          this.urlImage = this.serviceData.urlDataImage;
          this.getAllAnnoce();    
          this.getAllLastUserAdded();
          console.log('id : '+d);
        });
      }else{
          this.router.navigateByUrl('signup');
      }
    }).catch(res=>{
      console.log(res);
    })
  }
  // on scroll data is loading from server
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.getAllTerrainWithDetail();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataAnnonce.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  // on click like icon <ion-icon name="heart"></ion-icon>

  // on click message icon
  Interesed(id:string){
    let btnElement = document.getElementById('btn'+id);
    let btnIcon = document.getElementById('btnIconCheck'+id);
    let messageInteresse = document.getElementById('messageInteresse'+id);
    if(btnElement.getAttribute('color') === 'success'){
      btnElement.setAttribute('color','light');
      btnIcon.setAttribute('name','checkmark-circle');
      messageInteresse.innerText='non intéressé';
      //this.deleteAccepteAnnonce(parseInt(id));
      //console.log(btnElement);
      
    }else if(btnElement.getAttribute('color') === 'light'){
      btnElement.setAttribute('color','success');
      btnIcon.setAttribute('name','checkmark');
      messageInteresse.innerText='intéressé';
      this.addAccepteAnnonce(parseInt(id)); // send message to server
      document.getElementById('annonce'+id).classList.add('fadeInRight');
      setTimeout(() => {
        document.getElementById('annonce'+id).style.display='none';
      }, 1000);
    }
  }
// Add Accepte Annonce 
  addAccepteAnnonce(idAnnonce:number){
    this.serviceData.storage.get('id').then(d=>{
       this.serviceData.addAccepteAnnonce({'user_id':d,'publication_id':idAnnonce});
       console.log('je suis interessé');
    });
  }
  // delete Accepte Annonce 
  deleteAccepteAnnonce(idAnnonce:number){
    this.serviceData.storage.get('id').then(d=>{
      this.serviceData.deleteAccepteAnnonce({'user_id':d,'publication_id':idAnnonce});
      console.log('je suis interessé');     
   });
  }
 // openOption if on click more icon
  async presentActionSheet(id:string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          document.getElementById('annonce'+id).remove();
        }
      }, {
        text: 'Send Feedback',
        icon: 'send',
        handler: () => {
          console.log('Send Feedback clicked');
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
  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  // getAll Annonce 
  getAllAnnoce(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getAllAnnoce(id).subscribe(data=>{
        this.dataAnnonce = data;
       })
    })
  }

  // get All client Image
  getAllClient(){
    this.serviceData.getAllClient().subscribe(data=>{
      this.allImageUser = data
      console.log(data);
      
    });
  }

  // detail personne on click
  detailPersonne(idPersonne:string){
      console.log(idPersonne);
  }
  // get All Last user added
  getAllLastUserAdded(){
    this.serviceData.getAllLastUserAdded().subscribe(res=>{
        this.dataUsersAdded = res;
    })
  }
  // get all terrain with détail
   getAllTerrainWithDetail(){
    this.serviceData.getAllTerrainWithDetail().subscribe(res=>{
       this.allTerrainWithDetail = res;
       console.log(this.allTerrainWithDetail);
       
    })
  }
  // when user refesh page
  doRefresh(event) {
    setTimeout(() => { 
      this.getAllLastUserAdded();
      this.getAllAnnoce();
      this.getAllTerrainWithDetail();
      console.log('data is refresh');
      
      event.target.complete();
    }, 3000);
  }

   //zoom image clicked
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
   // detail Terrain by Click
   seeDetailTerrain(idTerrain:string){
    this.router.navigateByUrl('tabs/detail-terrain/'+idTerrain);
}
}
