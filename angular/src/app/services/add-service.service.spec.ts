import { TestBed, inject } from '@angular/core/testing';

import { AddServiceService } from './add-service.service';

describe('AddServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddServiceService]
    });
  });

  it('should be created', inject([AddServiceService], (service: AddServiceService) => {
    expect(service).toBeTruthy();
  }));
});
