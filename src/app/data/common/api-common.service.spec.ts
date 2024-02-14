import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { ApiCommonService } from './api-common.service';

describe('ApiCommonService', () => {
  let service: ApiCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(ApiCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
