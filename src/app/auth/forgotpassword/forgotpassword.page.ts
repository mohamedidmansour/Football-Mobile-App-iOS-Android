import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  constructor(public loadingController: LoadingController,
              private router:Router) { }

  ngOnInit() {
  }
  //alert to send email 
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "lines",
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    const date = setTimeout(() => {
      this.router.navigateByUrl('signup');
      loading.dismiss();
    }, 2000);
  }
}
