import { AnnonceModalPage } from './../annonce-modal/annonce-modal.page';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ServiceDataService } from 'src/app/services/service-data.service';
import { Annonce } from './../model/Annonce';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImage:string;
  mesNotifications:Annonce[] = []
  constructor(private serviceData:ServiceDataService,
            private actionSheetController:ActionSheetController,
            private modalController:ModalController) { }

  ngOnInit() {
    this.urlImage = this.serviceData.urlDataImage;
  }

  ionViewWillEnter(){
    // get my notifications
    this.getAllAnnoceAcceptedAndValideByIdUser();
  }
  getAllAnnoceAcceptedAndValideByIdUser(){
    this.serviceData.storage.get('id').then(id=>{
      this.serviceData.getAllAnnoceAcceptedAndValideByIdUser(id).subscribe(res=>{
        this.mesNotifications = res
      })
    })
  }
   // supprime une reservation ou bien modifier
   async presentActionSheet3(idReservation:string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Notification',
      buttons: [{
        text: 'Supprimé',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // delete Reservation
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
  // see Détail Publication 
  openPreviewDetailPublication(annonce:Annonce) {
    this.modalController.create({
      component: AnnonceModalPage,
      componentProps: {
        objAnnonce: annonce
      }
    }).then(modal => {
      modal.present();
    });
  }
 
}
