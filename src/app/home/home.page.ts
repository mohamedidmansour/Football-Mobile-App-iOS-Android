import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  
  constructor(private router: Router) {
    console.log("constructor");
  }
  ngOnInit() {
    this.goToNavigate();
  }

  goToNavigate(){
    setTimeout(() => {
      this.router.navigateByUrl('signup').finally(()=>{
        console.log('ok navigate succes');
        clearTimeout();
        console.log('clearTimeout succes');
      });
    }, 2000);
  }
}
