import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, shareReplay, takeUntil, tap } from 'rxjs';
import { User } from '../domain/user';
import { LocalStorageService } from './local-storage.service';
import { ApiCommonService } from '../data/common/api-common.service';
import { Token } from '../domain/token';
import { SpinnerService } from '../ui/spinner/spinner.service';
import { token } from 'server/routers/login.route';

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
    private localStorageService: LocalStorageService,
    private apiCommonService: ApiCommonService,
    private spinnerService: SpinnerService,
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

/**
 * Авторизация
 * @param email 
 * @param password 
 */
  login(login:string, password:string): Observable<User> {
    return this.apiCommonService.post<Token>('/login', {login, password}).pipe(
      tap((response: Token) => {
        this.localStorageService.setItem('token', response.token);
        this.localStorageService.setItem('refresh_token', response.refreshToken);
      }),
      map((response: Token) => {
        const {id, name, email} = JSON.parse(atob(response.token.split('.')[1]));
        return {id, name, email};
      }),
      shareReplay()
    )    
  }

  logout() {
    this.subject.next(null);
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refresh_token');
}
  
}
