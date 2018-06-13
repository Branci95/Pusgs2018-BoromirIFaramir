import { TestBed, inject } from '@angular/core/testing';

import { AddBranchService } from './add-branch.service';

describe('AddBranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddBranchService]
    });
  });

  it('should be created', inject([AddBranchService], (service: AddBranchService) => {
    expect(service).toBeTruthy();
  }));
});
