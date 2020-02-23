import { ServiceDataService } from './../services/service-data.service';
import { Annonce } from './../model/Annonce';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annonce-modal',
  templateUrl: './annonce-modal.page.html',
  styleUrls: ['./annonce-modal.page.scss'],
})
export class AnnonceModalPage implements OnInit {
  objAnnonce: Annonce;
  url:string
  constructor(private modalController:ModalController,
              private navParams: NavParams,
              private serviceData:ServiceDataService) { }

  ngOnInit() {
    this.url = this.serviceData.urlDataImage;
  }
  ionViewWillEnter(){
    this.objAnnonce = this.navParams.get('objAnnonce');
  }
  // close
 close(){
  this.modalController.dismiss();
 }
}
