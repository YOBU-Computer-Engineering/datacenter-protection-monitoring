import { TestBed } from '@angular/core/testing';

import { HcrsService } from './hcrs.service';

describe('HcrsService', () => {
  let service: HcrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
