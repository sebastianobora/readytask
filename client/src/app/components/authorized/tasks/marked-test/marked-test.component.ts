import {Component, OnInit} from '@angular/core';
import * as marked from 'marked';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-marked-test',
  templateUrl: './marked-test.component.html',
  styleUrls: ['./marked-test.component.css']
})
export class MarkedTestComponent implements OnInit {
  inputText: FormControl = new FormControl('');

  constructor() {

  }

  ngOnInit(): void {
  }

  parseToMarkdown(text: string): string {
    return marked.parse(text);
  }

}
