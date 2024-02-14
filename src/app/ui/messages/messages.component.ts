import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, MatIconModule, AsyncPipe]
})
export class MessagesComponent {
  errors$: Observable<string[]>;
  warns$: Observable<string[]>;
  messages$: Observable<string[]>;

  isShowErrors = false;
  isShowWarns = false;
  isShowMessages = false;

  constructor(public messageService: MessagesService) {
    this.errors$ = this.messageService.errors$.pipe(tap(() => this.isShowErrors = true));
    this.warns$ = this.messageService.warns$.pipe(tap(() => this.isShowWarns = true));
    this.messages$ = this.messageService.messages$.pipe(tap(() => this.isShowMessages = true));
  }

  onClose(type: 'error' | 'warn' | 'message') {
    if (type === 'error') this.isShowErrors = false;
    if (type === 'warn') this.isShowWarns = false;
    if (type === 'message') this.isShowMessages = false;
  }
}
