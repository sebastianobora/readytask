import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskExtended} from '../../../../entity/task';
import {DomSanitizer, SafeHtml, SafeUrl} from '@angular/platform-browser';
import {MarkdownService} from '../../../../service/markdown.service';
import {TaskState} from '../../../../entity/task-state.enum';
import {jsPDF} from 'jspdf';
import {UUID} from '../../../../../assets/uuid-type';
import {ConfirmationService} from '../../../../service/confirmation.service';
import {NotifierService} from '../../../../service/notifier.service';
import {LoggedUserService} from '../../../../service/logged-user.service';
import {User} from '../../../../entity/user';
import {ConnectionPositionPair} from '@angular/cdk/overlay';
import {TaskStateDataMap} from '../../../../../assets/TaskStateDataMap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css',
    '../../../../../assets/markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  @ViewChild('taskPreview') taskPreview!: ElementRef;
  loggedUser?: User;
  taskState = TaskState;
  task?: TaskExtended;
  logoSafeUrl: SafeUrl;
  overlayPosition: ConnectionPositionPair[];
  taskStateDataMap = TaskStateDataMap;
  copyTooltip = 'Copy markdown';
  downloadTaskTooltip = 'Download task as pdf';
  deadlineTooltip = 'Deadline';
  taskStartedMessage = 'Now the task is in progress';
  taskDeletionSuccessfulMessage = 'Task has been deleted';
  taskDeletionFailureMessage = 'Task cannot be deleted';
  isProgressBarTriggered = false;

  constructor(private taskService: TaskService,
              private loggedUserService: LoggedUserService,
              private markdownService: MarkdownService,
              private confirmationService: ConfirmationService,
              private notifierService: NotifierService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {
    this.logoSafeUrl = this.getSafeLogoImg();
    this.overlayPosition = this.getOverlayPosition();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadLoggedUser();
    if (id) {
      this.loadTask(id);
    }
  }

  originalOrder = (): number => {
    return 0;
  }

  getOverlayPosition(): ConnectionPositionPair[] {
    return [new ConnectionPositionPair(
      {originX: 'end', originY: 'bottom'},
      {overlayX: 'end', overlayY: 'top'})];
  }

  getSafeLogoImg(): SafeUrl {
    const logoUrl = 'assets/img/logo.png';
    return this.sanitizer.bypassSecurityTrustUrl(logoUrl);
  }

  loadLoggedUser(): void {
    this.loggedUserService.loggedUser.subscribe(user => this.loggedUser = user);
  }

  loadTask(id: UUID): void {
    this.taskService.getTask(id, {extended: true}).subscribe(task => this.task = task);
  }

  markdownToHtml(markdownText: string): SafeHtml {
    return this.markdownService.markdownToHtml(markdownText);
  }

  downloadTaskAsPdf(taskUUID: string): void {
    const htmlContent = this.taskPreview.nativeElement.cloneNode(true);
    htmlContent.classList.remove('hide-print-container');

    const pdf = new jsPDF('portrait', 'pt', 'a4');
    pdf.html(htmlContent, {autoPaging: 'text'})
      .then(() => pdf.save(taskUUID));
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

  confirmAndChangeState(id: UUID, taskState: TaskState): void {
    this.confirmationService.isConfirmed(() => this.saveTaskState(id, taskState));
  }

  confirmAndDeleteTask(id: UUID): void {
    this.confirmationService.isConfirmed(() => this.deleteTask(id));
  }

  deleteTask(id: UUID): void {
    this.taskService.delete(id).subscribe(
      () => this.notifyAndRedirectAfterSuccessfulDeletion(),
      () => this.notifierService.notify(this.taskDeletionFailureMessage, 'error')
    );
  }

  notifyAndRedirectAfterSuccessfulDeletion(): void {
    this.notifierService.notify(this.taskDeletionSuccessfulMessage, 'success');
    const path = 'tasks/my-tasks';
    this.router.navigate([path]);
  }
}
