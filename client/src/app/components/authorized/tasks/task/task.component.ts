import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskExtended} from '../../../../entity/task';
import {SafeHtml} from '@angular/platform-browser';
import {MarkdownService} from '../../../../service/markdown.service';
import {TaskState} from '../../../../entity/task-state.enum';
import {jsPDF} from 'jspdf';
import {UUID} from '../../../../../assets/uuid-type';
import {ConfirmationService} from '../../../../service/confirmation.service';
import {NotifierService} from '../../../../service/notifier.service';
import {LoggedUserService} from '../../../../service/logged-user.service';
import {User} from '../../../../entity/user';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css', '../../../../../assets/markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  @ViewChild('taskPreview') taskPreview!: ElementRef;
  loggedUser?: User;
  taskState = TaskState;
  task?: TaskExtended;
  copyTooltip = 'Copy markdown';
  downloadTaskTooltip = 'Download task as pdf';
  deadlineTooltip = 'Deadline';
  taskStartedMessage = 'Now the task is in progress';

  constructor(private taskService: TaskService,
              private loggedUserService: LoggedUserService,
              private markdownService: MarkdownService,
              private confirmationService: ConfirmationService,
              private notifierService: NotifierService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadLoggedUser();
    if (id) {
      this.loadTask(id);
    }
  }

  loadLoggedUser(): void {
    this.loggedUserService.loggedUser.subscribe(user => this.loggedUser = user);
  }

  loadTask(id: UUID): void {
    this.taskService.getTask(id).subscribe(task => this.task = task);
  }

  markdownToHtml(markdownText: string): SafeHtml {
    return this.markdownService.markdownToHtml(markdownText);
  }

  downloadTaskAsPdf(taskUUID: string): void {
    const htmlContent = this.taskPreview.nativeElement.cloneNode(true);
    htmlContent.classList.remove('hide-print-container');

    const img = this.getLogoImage();
    const pdf = new jsPDF('portrait', 'pt', 'a4');

    pdf.html(htmlContent, {autoPaging: true}).then(() => {
        pdf.addImage(img, 40, 40, 28, 28);
        pdf.save(taskUUID);
      }
    );
  }

  getLogoImage(): HTMLImageElement {
    let img = new Image();
    img.src = 'assets/img/logo.png';
    return img;
  }

  redirectToProfileUrl(username: string): void {
    const profilePath = `profile/public/${username}`;
    this.router.navigate([profilePath]);
  }

  confirmAndStartTask(id: UUID): void {
    this.confirmationService.isConfirmed(() => this.saveTaskState(id, TaskState.IN_PROGRESS));
  }

  saveTaskState(id: UUID, taskState: TaskState): void {
    this.taskService.changeState(id, taskState).subscribe(
      () => {
        this.notifierService.notify(this.taskStartedMessage, 'success');
        this.loadTask(id);
      }
    );
  }

  confirmAndFinishTask(id: UUID) {
    this.confirmationService.isConfirmed(() => this.saveTaskState(id, TaskState.FINISHED));
  }
}
