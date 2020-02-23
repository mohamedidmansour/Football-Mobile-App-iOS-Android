import { Client } from './../../model/Client';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceDataService } from 'src/app/services/service-data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  data:{
    email:string,
    password:string
  }={
    email:'',
    password:''
  }
  constructor(private router:Router,
    private httpClient:HttpClient,
    private serviceData:ServiceDataService) {
     }
  // variables
  
  //
  ngOnInit() {
    this.serviceData.storage.get('id').then(id=>{
        if(id != null){
          console.log('id not null');
          this.router.navigateByUrl('tabs/tab1');
        }else{
          console.log('id is null');
        }
    })
  }

  seConnecter(){
    this.router.navigateByUrl('forgotpassword');
    console.log('navigate to forgotpassword page ');
  }
  connexionClient(){
    this.serviceData.connexionClient(this.data);
  }
  creeCompte(){
    this.router.navigateByUrl('login');
  }
}
