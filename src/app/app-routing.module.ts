import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard';
import { NavigateGuard } from './guard/navigate.guard';

const routes: Routes = [
  { path: '',
   pathMatch: 'full',
  loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule) },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'users/login',
    loadChildren: () => import('./users/login/login.module').then( m => m.LoginPageModule),
    canActivate: []
  },
  {
    path: 'users/register',
    loadChildren: () => import('./users/register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'scored',
    loadChildren: () => import('./scored/scored.module').then( m => m.ScoredPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'scoreboard',
    loadChildren: () => import('./scoreboard/scoreboard.module').then( m => m.ScoreboardPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'userhistory',
    loadChildren: () => import('./userhistory/userhistory.module').then( m => m.UserhistoryPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'howtoplay',
    loadChildren: () => import('./howtoplay/howtoplay.module').then( m => m.HowtoplayPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found-component/not-found-component.module').then( m => m.NotFoundComponentPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found-component/not-found-component.module').then( m => m.NotFoundComponentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
