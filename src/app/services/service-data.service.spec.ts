import { TestBed } from '@angular/core/testing';

import { ServiceDataService } from './service-data.service';

describe('ServiceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceDataService = TestBed.get(ServiceDataService);
    expect(service).toBeTruthy();
  });
});
