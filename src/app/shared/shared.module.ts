import { NgModule } from '@angular/core';
import { EmailPipe } from './email.pipe';
import { SubTextPipe } from './subText.pipe';


@NgModule({
  declarations: [
    EmailPipe,
    SubTextPipe
  ],
  exports: [
    EmailPipe,
    SubTextPipe
  ]
})
export class SharedModule {}
