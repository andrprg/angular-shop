import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { User } from '../domain/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private subject = new BehaviorSubject<User | null>(null);

  /**
   * Информация о пользователе
   */
  user$: Observable<User | null> = this.subject.asObservable();

  /**
   * Пользователь авторизован
   */
  isLoggedIn$: Observable<boolean>;

  /**
   * Пользователь не авторизован
   */
  isLoggedOut$: Observable<boolean> ;

  /**
   * Subject для отписки
   */
  destroy$ = new Subject<boolean>();

  constructor(
    private localStorageService: LocalStorageService
  ) { 
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    this.localStorageService.getItem<User>('user').pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => user && this.subject.next(user));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();    
  }
}
