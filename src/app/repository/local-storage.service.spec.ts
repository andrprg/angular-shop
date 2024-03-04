import { TestBed, fakeAsync } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { state } from '@angular/animations';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    service.setItem('keyRemove', 'testRemove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должны получить "test localstorage" из хранилища', fakeAsync(() => {
    service.setItem('key', 'test');
    service.getItem('key').subscribe(data => {
      expect(data).toEqual('test');
    })
  }));

  it('должны удалить "test" из хранилища', fakeAsync(() => {
    service.removeItem('keyRemove');
    service.getItem('keyRemove').subscribe(data => {
      expect(data).toEqual(null);
    });
  }));

  it('должны очистить хранилище', fakeAsync(() => {
    service.clear();
    service.state$.subscribe(data => {
      expect(data).toEqual({});
    });
  }));

});
