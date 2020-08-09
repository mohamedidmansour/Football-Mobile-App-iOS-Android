import { Reserver } from './../model/Reserver';
import { Heure } from './../model/Heure';
import { ImageModalPage } from './../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import { TerrainDetail } from './../model/TerrainDetail';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';
@Component({
  selector: 'app-detail-terrain',
  templateUrl: './detail-terrain.page.html',
  styleUrls: ['./detail-terrain.page.scss'],
})
export class DetailTerrainPage implements OnInit {

  heuresReservation :Array<Heure[]>;
  dateToday:any;
  itemSelect = "01";
  dataLoading = false;
  urlImage:string;
  terrain:TerrainDetail = {
    id:0,
    categorie_id:0,
    url:"",
    nom:"",
    longeur:0,
    largeur:0,
    categorie:"11x11",
    type:"",
    prix_matain:0,
    prix_soir:0,
    heure_debut_matin:"08:00",
    heure_debut_soir:"18:00"
  }
  timeLoading  = true;
  dataNotValid = true;
  idClub:string
  idTerrain:string
  reservation:Reserver = {
    id:0,
    user_id:0,
    terrain_id:0,
    date_reservation:'',
    heure_reservation:''
 }
  constructor(private serviceData:ServiceDataService,
    private modalController:ModalController,
    public modalCtrl: ModalController,
    private router: ActivatedRoute) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.initHeur();
    this.router.params.subscribe(params => {
    if(params['idTerrain'] != null){
        this.dateToday = null;
        this.attenderLoading();
        this.serviceData.storage.get('id').then(idUser=>{
          this.idClub = idUser
          this.idTerrain = params['idTerrain']
          this.reservation.user_id = parseInt(idUser)
          this.reservation.terrain_id = parseInt(this.idTerrain)
          this.urlImage = this.serviceData.urlDataImage;
          this.getDataTerrainDetailByClub(params['idTerrain']);
        })
      }
    });
  }
  dateRange: { from: '2019-05-02'; to: '2019-05-07'; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  // open Calendrer
  async basic()
  {
    const options: CalendarModalOptions = {
      title: 'Date Reservation',
      color:'danger'
    };
    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });
    myCalendar.present();
    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
    if(date){
       if(this.idTerrain != null){
            this.initHeur();
            this.dateToday = date.string;
            this.reservation.date_reservation = this.dateToday
            this.getHeureReserverTerrain(date.string,parseInt(this.idTerrain))
        }
    }
  }
  // selected Heure 
  selectedItemHeure(item){
    document.getElementById(this.itemSelect).setAttribute('class',"fontFamilly");
    document.getElementById(item).setAttribute('class',"calendareItem");
    this.itemSelect = item;
    this.reservation.heure_reservation = item  + ':00:00'
  }
  // get Detail About Terrain 
  getDataTerrainDetailByClub(idTerrain:string){
      this.serviceData.getDataTerrainDetailByClub(idTerrain).subscribe(res=>{
         this.terrain = res[0];
      })
  }
  // zoom image clicked
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
  // reserver Le Terrain 
  addReservation(){
    this.serviceData.addReservation(this.reservation)
    this.initHeur();
    this.serviceData.presentLoadingWithOptions('tabs/tab3',1500);
  }
  // attendez 1500 ms
  attenderLoading(){
    this.dataLoading = false;
    setTimeout(() => {
      this.dataLoading = true;
    }, 1500);
  }
  //get All Heurs Reserved by Terrain
  getHeureReserverTerrain(dateReservation:string,terrain_id:number){
      this.serviceData.getHeureReserverTerrain({date_reservation:dateReservation,terrain_id:terrain_id}).subscribe(res=>{
          res.map(element=>{
            this.existHeure(element.heure_reservation);
          })
          this.dataNotValid = false;
      })
  }
  initHeur(){
    this.heuresReservation = [
      [{value:'01',enable:true},{value:'02',enable:true},{value:'03',enable:true},{value:'04',enable:true}],
      [{value:'05',enable:true},{value:'06',enable:true},{value:'07',enable:true},{value:'08',enable:true}],
      [{value:'09',enable:true},{value:'10',enable:true},{value:'11',enable:true},{value:'12',enable:true}],
      [{value:'13',enable:true},{value:'14',enable:true},{value:'15',enable:true},{value:'16',enable:true}],
      [{value:'17',enable:true},{value:'18',enable:true},{value:'19',enable:true},{value:'20',enable:true}],
      [{value:'21',enable:true},{value:'22',enable:true},{value:'23',enable:true},{value:'00',enable:true}]
    ] 
    this.dataNotValid = true;
    this.dateToday = null
  }
  existHeure(val:string){
    this.heuresReservation.map(obj=>{
      obj.map(ele=>{
         if(val === ele.value+':00:00'){
           ele.enable = false;
         }
      })
    })
  }
}
