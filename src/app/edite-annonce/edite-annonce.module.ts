import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditeAnnoncePage } from './edite-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: EditeAnnoncePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditeAnnoncePage]
})
export class EditeAnnoncePageModule {}
