import { TestBed } from '@angular/core/testing';

import { CompignsService } from './compigns.service';

describe('CompignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompignsService = TestBed.get(CompignsService);
    expect(service).toBeTruthy();
  });
});
