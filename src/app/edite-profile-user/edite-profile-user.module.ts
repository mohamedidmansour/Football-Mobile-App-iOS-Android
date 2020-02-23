import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditeProfileUserPage } from './edite-profile-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditeProfileUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditeProfileUserPage]
})
export class EditeProfileUserPageModule {}
