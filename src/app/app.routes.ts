import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';   
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' } 
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }