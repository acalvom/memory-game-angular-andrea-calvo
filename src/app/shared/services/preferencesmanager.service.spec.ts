import { TestBed } from '@angular/core/testing';

import { PreferencesmanagerService } from './preferencesmanager.service';

describe('PreferencesmanagerService', () => {
  let service: PreferencesmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferencesmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
