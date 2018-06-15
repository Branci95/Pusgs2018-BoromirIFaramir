import { TestBed, inject } from '@angular/core/testing';

import { AddVehicleService } from './add-vehicle.service';

describe('AddVehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddVehicleService]
    });
  });

  it('should be created', inject([AddVehicleService], (service: AddVehicleService) => {
    expect(service).toBeTruthy();
  }));
});
