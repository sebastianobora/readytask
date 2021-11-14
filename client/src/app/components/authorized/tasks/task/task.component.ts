import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../../entity/task';
import {Observable} from 'rxjs';
import {SafeHtml} from '@angular/platform-browser';
import {MarkdownService} from '../../../../service/markdown.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', '../../../../../assets/markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  task?: Observable<Task>;

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

  markdownToHtml(markdownText: string): SafeHtml{
    return this.markdownService.markdownToHtml(markdownText);
  }
}
