import { TestBed } from '@angular/core/testing';

import { TwitterStreamService } from './twitter-stream.service';

describe('TwitterStreamService', () => {
  let service: TwitterStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
