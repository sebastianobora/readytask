import {Component, OnInit, SecurityContext} from '@angular/core';
import * as marked from 'marked';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-marked-test',
  templateUrl: './marked-test.component.html',
  styleUrls: ['./marked-test.component.css']
})
export class MarkedTestComponent implements OnInit {
  inputText: FormControl = new FormControl('');

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
  }

  parseToHtml(text: string): string {
    const textParsedToHtml = marked.parse(text);
    return this.sanitizer.sanitize(SecurityContext.HTML, textParsedToHtml) as string;
  }

}
