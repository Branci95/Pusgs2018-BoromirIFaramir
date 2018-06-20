import { TestBed, inject } from '@angular/core/testing';

import { AddRentService } from './add-rent.service';

describe('AddRentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddRentService]
    });
  });

  it('should be created', inject([AddRentService], (service: AddRentService) => {
    expect(service).toBeTruthy();
  }));
});
