import { ReserverDetail } from './../model/ReserverDetail';
import { ActivatedRoute } from '@angular/router';
import { ServiceDataService } from './../services/service-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-reserever',
  templateUrl: './per-reserever.page.html',
  styleUrls: ['./per-reserever.page.scss'],
})
export class PerResereverPage implements OnInit {
  data:ReserverDetail[] = []
  imageUrl:string
  dataloading =  false
  constructor(private serviceData:ServiceDataService,
              private router: ActivatedRoute) { this.imageUrl = this.serviceData.urlDataImage}

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.router.params.subscribe(params => {
      this.getReservationByTerrain(params['idTerrain'])
      this.dataisloading();
    })
  }
  // data loading
  dataisloading(){
    this.dataloading = false;
      setTimeout(() => {
        this.dataloading = true;
      }, 2000);
  }
  // get All Reservation By Terrain
  getReservationByTerrain(idTerrain:string){
    this.serviceData.getReservationByTerrain(idTerrain).subscribe(res=>{
      this.data = res
      console.log(this.data);
    })
  }

  dateBetweenTwoDate(date:any):number{
     date = new Date(date);
     let d = new Date();
     let todayDate = new Date(d.getFullYear() + '-' + (d.getMonth()+1)  + '-'+ d.getDate())
    // To calculate the time difference of two dates 
    let Difference_In_Time =  date.getTime() - todayDate.getTime(); 
      
    // To calculate the no. of days between two dates 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days.toString())
  }

  // 
}
