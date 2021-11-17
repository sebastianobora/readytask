import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {ActivatedRoute} from '@angular/router';
import {TaskExtended} from '../../../../entity/task';
import {Observable} from 'rxjs';
import {SafeHtml} from '@angular/platform-browser';
import {MarkdownService} from '../../../../service/markdown.service';
import {TaskState} from '../../../../entity/task-state.enum';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', '../../../../../assets/markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  @ViewChild('taskPreview') taskPreview!: ElementRef;
  taskState = TaskState;
  task?: Observable<TaskExtended>;
  copyTooltip = 'Copy markdown';
  downloadTaskTooltip = 'Download task as pdf';
  deadlineTooltip = 'Deadline';

  constructor(private taskService: TaskService,
              private markdownService: MarkdownService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTask(id);
    }
  }

  markdownToHtml(markdownText: string): SafeHtml {
    return this.markdownService.markdownToHtml(markdownText);
  }

  downloadTaskAsPdf(taskUUID: string): void {
    const htmlContent = this.taskPreview.nativeElement.cloneNode(true);
    htmlContent.classList.remove('hide-print-container');

    const img = this.getLogoImage();
    const pdf = new jsPDF('portrait', 'pt', 'a4');

    pdf.html(htmlContent, {autoPaging: true})
      .then(() => {
        pdf.addImage(img, 40, 40, 28, 28);
        pdf.save(taskUUID);
      });
  }

  getLogoImage(): HTMLImageElement {
    let img = new Image();
    img.src = 'assets/img/logo.png';
    return img;
  }
}
