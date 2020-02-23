import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'list/login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './auth/signup/signup.module#SignupPageModule' },
  { path: 'forgotpassword', loadChildren: './auth/forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'add-terrain', loadChildren: './add-terrain/add-terrain.module#AddTerrainPageModule' },
  { path: 'annonce-modal', loadChildren: './annonce-modal/annonce-modal.module#AnnonceModalPageModule' }
  /*{ path: 'per-reserever', loadChildren: './per-reserever/per-reserever.module#PerResereverPageModule' },
    { path: 'detail-terrain', loadChildren: './detail-terrain/detail-terrain.module#DetailTerrainPageModule' },
    { path: 'edite-annonce', loadChildren: './edite-annonce/edite-annonce.module#EditeAnnoncePageModule' },
    { path: 'per-interested', loadChildren: './per-interested/per-interested.module#PerInterestedPageModule' },
    { path: 'add-annonce', loadChildren: './add-annonce/add-annonce.module#AddAnnoncePageModule' },
    { path: 'edite-profile-user', loadChildren: './edite-profile-user/edite-profile-user.module#EditeProfileUserPageModule' },
    { path: 'profile-user', loadChildren: './profile-user/profile-user.module#ProfileUserPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' }*/
];
/*
const routes:Routes = [
  {path:'list' , component: ListPage ,pathMatch: 'full'},
  {path:'home' , component: HomePage,pathMatch: 'full'}
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
