import { TestBed } from '@angular/core/testing';

import { UniqueUserValidatorService } from './unique-user-validator.service';

describe('UniqueUserValidatorService', () => {
  let service: UniqueUserValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueUserValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
