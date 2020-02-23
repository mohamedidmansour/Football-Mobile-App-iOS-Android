import { Router } from '@angular/router';
import { Client } from './../model/Client';
import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../services/service-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  urlImage:string
  clubs:Client[] = [];
  constructor(private serviceData:ServiceDataService,
            private router:Router) {
   }

  ngOnInit() {
    this.urlImage = this.serviceData.urlDataImage;
  }
  ionViewWillEnter() {
    this.getAllClub();
  }
  rechercheInputShow(){
   let ele =  document.getElementById('searchId');
   if(!ele.classList.contains('ion-hide'))
        ele.setAttribute('class','ion-hide');
    else{
        ele.classList.remove('ion-hide');
        ele.setAttribute('class','sc-ion-searchbar-ios-h sc-ion-searchbar-ios-s ios searchbar-left-aligned hydrated');
    }
  }
  getAllClub(){
      this.serviceData.getAllClub().subscribe(club=>{
          this.clubs = club;
      });
  }
  seeTerrain(idClub:string){
    this.router.navigateByUrl('tabs/tab2/'+idClub);
  }

  positionClubNavigate(idClub:string){
    this.router.navigateByUrl('tabs/tab5/'+idClub);
  }
}
