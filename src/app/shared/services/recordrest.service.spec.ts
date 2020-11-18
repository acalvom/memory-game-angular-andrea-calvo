import { TestBed } from '@angular/core/testing';

import { RecordrestService } from './recordrest.service';

describe('RecordrestService', () => {
  let service: RecordrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
