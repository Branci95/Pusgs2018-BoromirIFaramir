import { TestBed, inject } from '@angular/core/testing';

import { HomeRegularService } from './home-regular.service';

describe('HomeRegularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeRegularService]
    });
  });

  it('should be created', inject([HomeRegularService], (service: HomeRegularService) => {
    expect(service).toBeTruthy();
  }));
});
