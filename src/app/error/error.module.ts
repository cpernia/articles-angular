import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
