import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './/not-found/not-found.component';

const errorRoutes: Routes = [
  { path: '404', component: NotFoundComponent, data: { title: 'Not Found' } },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forChild(errorRoutes)
  ],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
