import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailPipe'
})
export class EmailPipe implements PipeTransform {
  transform(email: string): string {
    return email.split('@')[0] + '...';
  }
}
