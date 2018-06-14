import { TestBed, inject } from '@angular/core/testing';

import { AddTypeOfVehicleService } from './add-type-of-vehicle.service';

describe('AddTypeOfVehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTypeOfVehicleService]
    });
  });

  it('should be created', inject([AddTypeOfVehicleService], (service: AddTypeOfVehicleService) => {
    expect(service).toBeTruthy();
  }));
});
