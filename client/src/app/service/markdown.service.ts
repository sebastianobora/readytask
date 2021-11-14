import { Injectable } from '@angular/core';
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

  constructor(private sanitizer: DomSanitizer) { }

  markdownToHtml(markdownText: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(markdownText));
  }
}
