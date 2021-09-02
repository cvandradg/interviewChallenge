import { TestBed } from '@angular/core/testing';

import { TpmserviceService } from './tpmservice.service';

describe('TpmserviceService', () => {
  let service: TpmserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpmserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
