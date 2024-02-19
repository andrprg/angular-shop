import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  private subjectErrors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.subjectErrors.asObservable()
  .pipe(
    filter(errors => errors && errors.length > 0)
  );

  private subjectWarns: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  warns$: Observable<string[]> = this.subjectWarns.asObservable()
  .pipe(
    filter(warns => warns && warns.length > 0)
  );

  private subjectMessages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  messages$: Observable<string[]> = this.subjectMessages.asObservable()
    .pipe(
      filter(messages => messages && messages.length > 0)
    );

  showErrors(...errors: string[]) {
    this.subjectErrors.next(errors);
  }

  showsWarns(...warns: string[]) {
    this.subjectWarns.next(warns);
  }

  showMessages(...messages: string[]) {
    this.subjectMessages.next(messages);
  }
}
