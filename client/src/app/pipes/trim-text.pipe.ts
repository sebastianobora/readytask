import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    limit = text.substr(0, limit).lastIndexOf(' ');
    if (limit < 0 || text.length < limit){
      return text;
    }else{
      return text.substr(0, limit) + '...';
    }
  }
}
