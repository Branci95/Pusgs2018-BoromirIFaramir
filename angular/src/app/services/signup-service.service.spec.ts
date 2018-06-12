import { TestBed, inject } from '@angular/core/testing';

import { SignupServiceService } from './signup-service.service';

describe('SignupServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupServiceService]
    });
  });

  it('should be created', inject([SignupServiceService], (service: SignupServiceService) => {
    expect(service).toBeTruthy();
  }));
});
