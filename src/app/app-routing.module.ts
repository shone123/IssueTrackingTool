// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { FirstComponent } from './first/first.component';
// import { SecondComponent } from './second/second.component';

// const appRoutes: Routes = [
//   { path: '', component: FirstComponent, data: { title: 'First Component' } },
//   { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
//   { path: 'second', component: SecondComponent, data: { title: 'Second Component' } }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './Register/user.component';
import {LoginComponent} from './login/login.component';
const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }