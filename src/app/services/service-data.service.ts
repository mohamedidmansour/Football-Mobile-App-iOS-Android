import { PositionClub } from './../model/PositionClub';
import { ReserverUser } from './../model/ReserverUser';
import { ReserverDetail } from './../model/ReserverDetail';
import { Reserver } from './../model/Reserver';
import { TerrainDetail } from './../model/TerrainDetail';
import { Terrain } from './../model/Terrain';
import { Type } from './../model/Type';
import { Categorie } from './../model/Categorie';
import { Packs } from './../model/Packs';
import { AnnonceInfo } from './../model/AnnonceInfo';
import { Annonce } from './../model/Annonce';
import { Client } from './../model/Client';
import { Injectable } from '@angular/core';
import { AlertController,LoadingController, ActionSheetController,NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ServiceDataService {
  
  
  //http://192.168.1.128:8080/
  ip= '192.168.43.79'
  port='8000'
  urlDataImage = 'http://'+this.ip+':8000/storage/images/';
  urlRoute = 'http://'+this.ip+':8000/api/';
  urlServiceAddImage = 'http://'+this.ip+'/api/upload/user/insertImage.php';
  // le client
  constructor(private router:Router,
              private alertController:AlertController,
              public navCtrl: NavController, 
              private transfer: FileTransfer,
              public loadingController: LoadingController,
              private httpClient: HttpClient,
              public storage: Storage
            ) {
   }
  
  uploadImage(myphoto:string){
    //Show loading
    // this.presentLoadingWithOptions();
    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();
    let isErreur: number;
    //random int
    var random = Math.floor(Math.random() * 100);
    var random2 = Math.floor(Math.random() * 100);
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "img___" + random + '__'+ random2 + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    //file transfer action
    fileTransfer.upload(myphoto, this.urlServiceAddImage, options)
      .then((data) => {
        isErreur = 0;
      }, (err) => {
        console.log(err);
        isErreur = 1;
        //this.presentLoadingWithOptions();
      });
      return options.fileName;
  }
  // waint 1 minute
  async presentLoadingWithOptions(route:string,time:number) {
    const loading = await this.loadingController.create({
      spinner: "lines",
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    const date = setTimeout(() => {
      if(route != ''){
          this.router.navigateByUrl(route);
      }
      loading.dismiss();
    }, time);
  }
  async presentAlertConfirm(_message:string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: _message,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
   ///////////////////////////////CLIENT/////////////////////////
  ///////////////////////////////CODE////////////////////////////
  ///////////////////////////////CLIENT/////////////////////////
    // INSCRIRE CLIENT
  inscrire(clientApp:Client) {
      let url = this.uploadImage(clientApp.url);
      this.presentLoadingWithOptions('signup',2500);
      let Data ={
          'nom':clientApp.nom,
          'prenom':clientApp.prenom,
          'brand_name':clientApp.brand_name,
          'email':clientApp.email,
          'password':clientApp.password,
          'dateNaissance':clientApp.dateNaissance,
          'tel':clientApp.tel,
          'adresse':clientApp.adresse,
          'laltitude':clientApp.laltitude,
          'longitude':clientApp.longitude,
          'ville':clientApp.ville,
          'coverture':clientApp.coverture,
          'url':url,
          'type':clientApp.type
        }
    ;
    this.httpClient.post(this.urlRoute + 'clients/add',Data)
        .subscribe(data => {
             console.log(data);
    });

  }
  // CONNEXION CLIENT
  connexionClient(data:{
    email:string,
    password:string
  }){
      this.httpClient.post<{id:string}>(this.urlRoute + 'clients/connexion',data).subscribe(res=>{
         if(res[0].id != "no"){
           this.storage.set('id',res[0].id);
           this.router.navigateByUrl('tabs/tab1');
         }else{
           this.presentAlertConfirm('<h4 style="color:red;">Donneés Icorrect </h4>!!!');
         }
      });
  }
  // edite profile
  editUserData(data: Client,imageIsChange:boolean):Observable<Client> {
    if(imageIsChange){
      data.url = this.uploadImage(data.url);
    }
    return this.httpClient.post<Client>(this.urlRoute + 'clients/edit/',data);
  }
    // GET DATA ABOUT CLEINT 
  getDataClient(id:string):Observable<Client>{
   return this.httpClient.get<Client>(this.urlRoute + 'clients/data/' + id);
  }
  // GET ALL CLUB 
  getAllClub():Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.urlRoute + 'clients/clientsTypeClub');
  }
  // GET ALL IMAGES BY USERS
  getAllImageUser(idUser:string):Observable<{'url':string}[]>{
    return this.httpClient.get<{'url':string}[]>(this.urlRoute + 'images/getAllImageUser/' + idUser);
  }
  // GET ALL CLIENT 
  getAllClient():Observable<Client[]>{
      return this.httpClient.get<Client[]>(this.urlRoute + 'clients/getAllClient')
  }
  //-> ADD IMAGE 
  addImageByUser(data:{
    user_id:string,
    url:string
  }){
      data.url = this.uploadImage(data.url);
      this.httpClient.post(this.urlRoute + 'images/addImageUser/',data).subscribe(res=>{
         console.log(res);
      });
  }
  // getAll User added last time
  getAllLastUserAdded():Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.urlRoute + 'clients/getAllLastUserAdded/');
  }
  // get Position for club
  getPositionClub(idClub:string):Observable<PositionClub[]>{
    return this.httpClient.get<PositionClub[]>(this.urlRoute + 'clients/getPositionClub/'+idClub);
  }
  ///////////////////////////////ANNONCE/////////////////////////
  ///////////////////////////////CODE////////////////////////////
  ///////////////////////////////ANNONCE/////////////////////////

    //-> add
  addAnnonce(objAnnoce:Annonce) {
      let url = this.uploadImage(objAnnoce.image);
      this.presentLoadingWithOptions('tabs/profile-user',2500);
      let Data ={
          'user_id':objAnnoce.userId,
          'titre':objAnnoce.titre,
          'pub':objAnnoce.pub,
          'image':url,
          'date_creation':'2019-09-08'
        }
    ;
    this.httpClient.post(this.urlRoute + 'annonce/add',Data)
        .subscribe(data => {
            console.log(data);
    });
  }
  // -> edit Annonce
  editeAnnonce(objAnnoce:Annonce) {
      let url = this.uploadImage(objAnnoce.image);
      this.presentLoadingWithOptions('tabs/profile-user',2500);
      let Data ={
          'id':objAnnoce.id,
          'user_id':objAnnoce.userId,
          'titre':objAnnoce.titre,
          'pub':objAnnoce.pub,
          'image':url,
          'date_creation':'2019-09-08'
        }
    ;
    this.httpClient.post(this.urlRoute + 'annonce/edit',Data)
        .subscribe(data => {
            console.log(data);
    });
  }

  //-> get Data about Annonce by id
  getAnnonceById(idAnnonce:string):Observable<Annonce>{
    return this.httpClient.get<Annonce>(this.urlRoute + 'annonce/dataByIdAnnonce/'  + idAnnonce);
  }

  //-> getAll Annonce
  getAllAnnoce(id:string):Observable<AnnonceInfo[]>{
    return this.httpClient.get<AnnonceInfo[]>(this.urlRoute + 'annonce/data/'+id);
  }
   //-> getll Annonce d'un client ou bien Club
  getAllAnnoceByIdUser(id:string):Observable<Annonce[]>{
    return this.httpClient.get<Annonce[]>(this.urlRoute + 'annonce/dataByIdUser/'+id);
  }
  //-> delete Annonce 
  deleteAnnonce(idAnnonce:string):Observable<{isdelete:Boolean}>{
      return this.httpClient.get<{isdelete:Boolean}>(this.urlRoute + 'annonce/delete/'+idAnnonce);
  }

   ///////////////////////////////ACCEPTATION ANNONCE/////////////////////////
  //////////////////////////////////////CODE////////////////////////////
  ///////////////////////////////ACCEPTATION ANNONCE/////////////////////////

  //-> accepté annoce  ajouter une acceptation de cette Publication
  addAccepteAnnonce(obj:{
        user_id:number,
        publication_id:number
      }) {
      let Data ={
        'user_id':obj.user_id,
        'publication_id':obj.publication_id
      };
      this.httpClient.post(this.urlRoute + 'accepteAnnonce/add',Data)
          .subscribe(data => {
              console.log(data);
      });
  }

  //-> delete Accepte Annonce
  deleteAccepteAnnonce(obj:{
    user_id:number,
    publication_id:number
    }) {
    let Data ={
      'user_id':obj.user_id,
      'publication_id':obj.publication_id
    };
    this.httpClient.post(this.urlRoute + 'accepteAnnonce/delete',Data)
        .subscribe(data => {
            console.log(data);
      });
  }

  //-> return tout les annonce accepté par un client
    // getAllAnnoceAcceptedByIdUser(idUser:string):Observable<Annonce[]>{
    //   return this.httpClient.get<Annonce[]>(this.urlRoute + 'accepteAnnonce/dataByIdUser/'+idUser);
    // }
  //-> return tout les annonce accepté par un client et valide 
  getAllAnnoceAcceptedAndValideByIdUser(idUser:string):Observable<Annonce[]>{
    return this.httpClient.get<Annonce[]>(this.urlRoute + 'accepteAnnonce/acceptedAndValideByIdUser/'+idUser);
  }
  //-> return tout les clients accepté une annonce
  getAllUserAcceptedAnnonce(idAnnonce:string):Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.urlRoute + 'accepteAnnonce/getAllUserAcceptedAnnonce/'+idAnnonce);
  }
  // getImageAnnonce(idAnnonce:string):Observable<ImageUrl[]>{
  //   return this.httpClient.get<ImageUrl[]>(this.urlRoute + 'images/dataByIdAnnonce/'+idAnnonce);
  // }
  // -> CHANGE LE CHAMP VALIDE PAR 1
  addValiderJoueur(obj:{
    user_id:number,
    publication_id:number
    }) {
    let Data ={
      'user_id':obj.user_id,
      'publication_id':obj.publication_id
    };
    this.httpClient.post(this.urlRoute + 'accepteAnnonce/valider/',Data)
        .subscribe(data => {
    });
  }
  // -> CHENGE LE CHAMP VALIDE PAR 0
  
  deleteValiderJoueur(obj:{
    user_id:number,
    publication_id:number
    }) {
    let Data ={
      'user_id':obj.user_id,
      'publication_id':obj.publication_id
    };
    this.httpClient.post(this.urlRoute + 'accepteAnnonce/Deletevalider/',Data)
        .subscribe(data => {
    });
  }

  ///////////////////////////////PACKS/////////////////////////
  ///////////////////////////////CODE/////////////////////////
  ///////////////////////////////PACKS///////////////////////

  // ADD PACKS
    // cette fonction permet d'ajouter un packe et renvoi id 
  addPackes(objPacks:Packs):Observable<{id:string}> {
    let Data ={
      'user_id':objPacks.user_id,
      'prix_matain':objPacks.prix_matain,
      'prix_soir':objPacks.prix_soir,
      'heure_debut_matin':objPacks.heure_debut_matin,
      'heure_debut_soir':objPacks.heure_debut_soir
    };
    return this.httpClient.post<{id:string}>(this.urlRoute + 'packes/add',Data);
  }
  // get All Packes by club
  getAllPackesByClub(idClub:string):Observable<Packs[]>{
    return this.httpClient.get<Packs[]>(this.urlRoute + 'packes/getByClub/'+idClub);
  }

 ///////////////////////////////CATEGORIES/////////////////////////
  ///////////////////////////////CODE/////////////////////////
  ///////////////////////////////CATEGORIES///////////////////////

 // get All Categorie by club
  getAllCategories():Observable<Categorie[]>{
    return this.httpClient.get<Categorie[]>(this.urlRoute + 'categories/getAllCategorie/');
  }

  ///////////////////////////////TYPES/////////////////////////
  ///////////////////////////////CODE/////////////////////////
  ///////////////////////////////TYPES///////////////////////

 // get All Types by club
  getAllTypes():Observable<Type[]>{
    return this.httpClient.get<Type[]>(this.urlRoute + 'types/getAllTypes/');
  }
 ///////////////////////////////TERRAINS/////////////////////////
  ///////////////////////////////CODE////////////////////////////
  ///////////////////////////////TERRAINS/////////////////////////

    //-> add
    addTerrain(objTerrain:Terrain) {
      objTerrain.url = this.uploadImage(objTerrain.url);
      this.httpClient.post(this.urlRoute + 'terrains/add/',objTerrain)
        .subscribe(res => {
          console.log('Terrain Bien Ajouter');
      });
    }
    // get  Terrain By Club
    getTerrainByClub(idClub:string):Observable<Terrain[]>{
      return this.httpClient.get<Terrain[]>(this.urlRoute + 'terrains/getTerrainByClub/'+idClub);
    }
    // get All Terrain By Club with Détail
    getTerrainDetailByClub(idClub:string):Observable<TerrainDetail[]>{
      return this.httpClient.get<TerrainDetail[]>(this.urlRoute + 'terrains/getTerrainDetailByClub/'+idClub);
    }
    // get All Terrain 
    getAllTerrain():Observable<Terrain[]>{
      return this.httpClient.get<Terrain[]>(this.urlRoute + 'terrains/getAllTerrain');
    }
    // le détail d'un Terrain
    getDataTerrainDetailByClub(idTerrain:string):Observable<TerrainDetail>{
      return this.httpClient.get<TerrainDetail>(this.urlRoute + 'terrains/getDataTerrainDetailByClub/'+idTerrain);
    }
      // get All Terrain with détail
      getAllTerrainWithDetail():Observable<TerrainDetail[]>{
        return this.httpClient.get<TerrainDetail[]>(this.urlRoute + 'terrains/getAllTerrainWithDetail');
      }

    ///////////////////////////////RESERVATIONS/////////////////////////
    ///////////////////////////////CODE////////////////////////////
    ///////////////////////////////RESERVATIONS/////////////////////////

    // Add Reservation 
    addReservation(obj:Reserver){
       this.httpClient.post(this.urlRoute + 'reserves/add',obj).subscribe(res=>{
         console.log('Reservation Bien Ajouter');
       });
    }
    // get All Heure Reserver by Terrain
    getHeureReserverTerrain(obj:{
      date_reservation:string,
      terrain_id:number
    }):Observable<{heure_reservation:string}[]>{
       return this.httpClient.post<{heure_reservation:string}[]>(this.urlRoute + 'reserves/getHeureLibreTerrain',obj);
    }

    getReservationByClient(idClient:string):Observable<ReserverUser[]>{
      return this.httpClient.get<ReserverUser[]>(this.urlRoute + 'reserves/getReservationByUser/'+idClient)
    }
    // get All Reservation By Terrain
    getReservationByTerrain(idTerrain:string):Observable<ReserverDetail[]>{
      return this.httpClient.get<ReserverDetail[]>(this.urlRoute + 'reserves/getReservationByTerrain/'+idTerrain)
    }
    // delete Reservation
    deleteReservation(obj:{idReservation:string}){
      this.httpClient.post(this.urlRoute + 'reserves/delete/',obj).subscribe(res=>{
        console.log("resérvation bien supprimé !!");
      })
    }
}
