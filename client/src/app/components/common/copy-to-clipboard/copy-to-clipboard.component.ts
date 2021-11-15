import {Component, Input, OnInit} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-copy-to-clipboard[contentToCopy]',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit {
  @Input() contentToCopy!: string;
  @Input() copySuccessfulMessage = 'Copied!';
  copySuccessfulMessageDelayInMs = 200;
  copySuccessfulMessageDurationInMs = 2000;
  copyTooltipMessage = 'Copy';
  copyTooltipMessageDelayInMs = 100;

  constructor() {
  }

  ngOnInit(): void {
  }

  showCopiedMessage(tooltip: MatTooltip) {
    tooltip.disabled = false;
    tooltip.show(this.copySuccessfulMessageDelayInMs);
    setTimeout(() => tooltip.disabled = true, this.copySuccessfulMessageDurationInMs);
  }
}
