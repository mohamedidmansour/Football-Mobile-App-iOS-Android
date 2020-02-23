import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfileUserPage } from './profile-user.page';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
const routes: Routes = [
  {
    path: '',
    component: ProfileUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2GoogleChartsModule,
    RoundProgressModule
  ],
  declarations: [ProfileUserPage]
})
export class ProfileUserPageModule {}
