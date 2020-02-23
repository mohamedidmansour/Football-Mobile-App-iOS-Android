import { Client } from './../model/Client';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDataService } from '../services/service-data.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-per-interested',
  templateUrl: './per-interested.page.html',
  styleUrls: ['./per-interested.page.scss'],
})
export class PerInterestedPage implements OnInit {

    // variables
    urlImage:string;
    idAnnonce:number;
    dataAllClient:Client[] = [];
    constructor(private router: Router,
        private route: ActivatedRoute,
        private serviceData:ServiceDataService,
        private callNumber: CallNumber
        ) {}

    ngOnInit(){
      this.route.params.subscribe(params => {
        this.urlImage= this.serviceData.urlDataImage;
        this.getAllUserAcceptedAnnonce(params['idAnnonce']);
        this.idAnnonce = parseInt(params['idAnnonce']);
      });
     }
     // getAll user Accepted Annonce 
    getAllUserAcceptedAnnonce(idAnnonce:string){
      this.serviceData.getAllUserAcceptedAnnonce(idAnnonce).subscribe(data=>{
          this.dataAllClient = data;
          console.log(data);
      });
    }
    // call Personn

    callPerson(tel:string){
      this.callNumber.callNumber(tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }
    // ajouter La Demande (changer le change valide par 1)
    validerPerson(idClient:number){
      this.serviceData.addValiderJoueur({user_id:idClient,publication_id:this.idAnnonce});
      setTimeout(() => {
        this.getAllUserAcceptedAnnonce(this.idAnnonce+'');
      }, 1500);
    }
    // annuler La Demande (changer le change valide par 0)
    AnnulervaliderPerson(idClient:number){
      this.serviceData.deleteValiderJoueur({user_id:idClient,publication_id:this.idAnnonce});
      setTimeout(() => {
        this.getAllUserAcceptedAnnonce(this.idAnnonce+'');
      }, 1500);
    }
}
