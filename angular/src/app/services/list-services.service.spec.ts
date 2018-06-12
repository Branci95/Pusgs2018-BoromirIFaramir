import { TestBed, inject } from '@angular/core/testing';

import { ListServicesService } from './list-services.service';

describe('ListServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListServicesService]
    });
  });

  it('should be created', inject([ListServicesService], (service: ListServicesService) => {
    expect(service).toBeTruthy();
  }));
});
