import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {
  private ellipsis = '...';
  private separator = ' ';

  transform(text: string, limit: number): string {
    if (text.length < limit) {
      return text;
    }
    const indexOfLastSeparator = this.getIndexOfLastSeparator(text, limit);

    if (this.hasMultipleWords(indexOfLastSeparator)) {
      limit = indexOfLastSeparator;
    }
    return this.getTrimmedText(text, limit);
  }

  private hasMultipleWords = (indexOfLastSeparator: number): boolean => !(indexOfLastSeparator < 0);

  private getIndexOfLastSeparator = (text: string, limit: number) => text.substr(0, limit).lastIndexOf(this.separator);

  private getTrimmedText = (text: string, limit: number): string => text.substr(0, limit) + this.ellipsis;
}
