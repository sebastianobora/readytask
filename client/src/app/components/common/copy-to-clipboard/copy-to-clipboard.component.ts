import {Component, Input, OnInit} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-copy-to-clipboard[contentToCopy]',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.css']
})
export class CopyToClipboardComponent implements OnInit {
  @Input() contentToCopy!: string;
  @Input() copyTooltipMessage = 'Copy';
  copyTooltipMessageDelayInMs = 100;
  copySuccessfulMessage = 'Copied!';
  copySuccessfulMessageDelayInMs = 150;
  copySuccessfulMessageDurationInMs = 1000;

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
