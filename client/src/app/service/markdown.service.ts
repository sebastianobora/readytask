import {Injectable, SecurityContext} from '@angular/core';
import * as marked from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

marked.setOptions({
  smartypants: true,
  smartLists: true
});

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  constructor(private sanitizer: DomSanitizer) {
  }

  markdownToHtml(markdownText: string): SafeHtml {
    const htmlText = marked.parse(markdownText);
    const safeHtmlText = this.sanitizer.sanitize(SecurityContext.HTML, htmlText);
    return this.sanitizer.bypassSecurityTrustHtml(safeHtmlText as string);
  }
}
