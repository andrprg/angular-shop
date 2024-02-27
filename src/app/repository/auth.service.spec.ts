import { TestBed, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  const user = {
    id: '1',
    name:'Test Name',
    email: 'test@test.ru',
  };

  beforeEach(() => {
    let spy = jasmine.createSpyObj('LocalStorageService', {
        getItem: of({...user})
      }
    );
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
        provide: LocalStorageService, useValue: spy}
      ]
    });
    service = TestBed.inject(AuthService);
    localStorageServiceSpy =  TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должен вернуть объект User', fakeAsync(() => {
    service.user$.subscribe(value => {
      expect(value).toEqual(user);
    });

    service.isLoggedIn$.subscribe(value => {
      expect(value).withContext('isLoggedIn установлен в true')
      .toBeTruthy();
    });

    service.isLoggedOut$.subscribe(value => {
      expect(value).withContext('isLoggedOut установлен в false')
      .toBeFalsy();
    });

  }));
});
