import { TestBed } from '@angular/core/testing';

import { UsersrestService } from './usersrest.service';

describe('UsersrestService', () => {
  let service: UsersrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
