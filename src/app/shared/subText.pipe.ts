import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subText'
})
export class SubTextPipe implements PipeTransform {
  transform(title: string, limit: number): string {
    if (title.length > limit) {
      return title.substr(0, limit) + '...';
    }
    return title;
  }
}
