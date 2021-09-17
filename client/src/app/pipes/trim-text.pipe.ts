import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    if (text.length < limit){
      return text;
    }
    limit = text.substr(0, limit).lastIndexOf(' ');
    return limit < 0 ? text : text.substr(0, limit) + '...';
  }
}
