import { TerrainDetail } from './../model/TerrainDetail';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  
  idClub:string
  urlImage:string
  terrains:TerrainDetail[] = [];
  constructor(public modalCtrl: ModalController,
              private serviceData:ServiceDataService,
              private route:Router,
              private router: ActivatedRoute) {
  }
  ngOnInit() {
    //document.getElementById(this.itemSelect).setAttribute('class',"calendareItem");
  }
  ionViewWillEnter(){
    this.router.params.subscribe(params => {
      if(params['idClub'] != null){
        this.urlImage = this.serviceData.urlDataImage;
        this.idClub = params['idClub'];
        this.getTerrainByClub();
      }else{
        this.route.navigateByUrl('tabs/tab3');
      }
    });
  }

  getTerrainByClub(){
    this.serviceData.getTerrainDetailByClub(this.idClub).subscribe(res=>{
      this.terrains = res;
    })
  }
  // detail Terrain by Click
  seeDetailTerrain(idTerrain:string){
      this.route.navigateByUrl('tabs/detail-terrain/'+idTerrain);
  }
}
