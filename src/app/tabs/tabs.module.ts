import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'tab1', loadChildren: '../tab1/tab1.module#Tab1PageModule' },
        { path: 'tab2/:idClub', loadChildren: '../tab2/tab2.module#Tab2PageModule' },
        { path: 'tab3', loadChildren: '../tab3/tab3.module#Tab3PageModule' },
        { path: 'tab4', loadChildren: '../tab4/tab4.module#Tab4PageModule' },
        { path: 'tab5/:idClub', loadChildren: '../tab5/tab5.module#Tab5PageModule' },
        { path: 'profile-user', loadChildren: '../profile-user/profile-user.module#ProfileUserPageModule' },
        { path: 'edite-profile-user', loadChildren: '../edite-profile-user/edite-profile-user.module#EditeProfileUserPageModule' },
        { path: 'add-annonce', loadChildren: '../add-annonce/add-annonce.module#AddAnnoncePageModule' },
        { path: 'per-interested/:idAnnonce', loadChildren: '../per-interested/per-interested.module#PerInterestedPageModule' },
        { path: 'edite-annonce/:idAnnonce', loadChildren: '../edite-annonce/edite-annonce.module#EditeAnnoncePageModule' },
        { path: 'detail-terrain/:idTerrain', loadChildren: '../detail-terrain/detail-terrain.module#DetailTerrainPageModule' },
        { path: 'per-reserever/:idTerrain', loadChildren: '../per-reserever/per-reserever.module#PerResereverPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
