import { TestBed } from '@angular/core/testing';

import { LocalCartService } from './local-cart.service';
import { LocalStorageService } from './local-storage.service';
import { of } from 'rxjs';

describe('LocalCartService', () => {
  let service: LocalCartService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    let spy = jasmine.createSpyObj('LocalStorageService', {
      getItem: of([])
    }
  );
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
