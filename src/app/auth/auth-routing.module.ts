import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
  { path: 'signup', component: AuthComponent, data: { title: 'Articles | Sign Up' } },
  { path: 'signin', component: AuthComponent, data: { title: 'Articles | Sign In' } }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
