import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, map, shareReplay, take, takeUntil, tap } from 'rxjs';
import { User } from '../domain/user';
import { LocalStorageService } from './local-storage.service';
import { ApiCommonService } from '../data/common/api-common.service';
import { Token } from '../domain/token';
import { SpinnerService } from '../ui/spinner/spinner.service';
import { timer } from 'rxjs';

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
   * access token
   */
  private access_token: string | undefined | null;

    /**
   * refresh token
   */
    private refresh_token: string | undefined | null;


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

    this.localStorageService.getItem<string>('token').pipe(
      takeUntil(this.destroy$)
    ).subscribe(token => this.access_token = token);

    this.localStorageService.getItem<string>('refresh_token').pipe(
      takeUntil(this.destroy$)
    ).subscribe(token => this.refresh_token = token);


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
  login(email:string, password:string): Observable<User> {
    return this.apiCommonService.post<Token>('/login', {email, password}).pipe(
      tap((response: Token) => {
        this.localStorageService.setItem('token', response.token);
        this.localStorageService.setItem('refresh_token', response.refreshToken);
      }),
      map((response: Token) => {
        const {id, name, email} = JSON.parse(atob(response.token.split('.')[1]));
        this.subject.next({id, name, email});
        this.startTokenTimer();
        return {id, name, email};
      }),
      shareReplay()
    )    
  }

  logout() {
    console.log('LOGOUT');
    this.subject.next(null);
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refresh_token');
}

  /**   
   * @description запускаем таймер за минуту до истечения срока действия токена
   */
  private startTokenTimer() {
    if(!this.access_token) return;
    const jwtToken = JSON.parse(atob(this.access_token.split('.')[1]));
    console.log('date:', new Date(jwtToken.exp * 1000));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now(); //  - (60 * 1000);
    timer(timeout).subscribe(_ => this.refreshToken()); 
  } 

  private refreshToken() {
    this.apiCommonService.post<Token>('/token', {refreshToken: this.refresh_token}).pipe(
      tap((response: Token) => {
        this.localStorageService.setItem('token', response.token);
      }),
      map((response: Token) => {
        const {id, name, email} = JSON.parse(atob(response.token.split('.')[1]));
        this.subject.next({id, name, email});
        this.startTokenTimer();
        return {id, name, email};
      }),
      take(1)
    ).subscribe({
      error: () => this.logout() 
    });   
  }
}
