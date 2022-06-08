import { TestBed } from '@angular/core/testing';

import { ImunobiologicoServiceService } from './imunobiologico-service.service';

describe('ImunobiologicoServiceService', () => {
  let service: ImunobiologicoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImunobiologicoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
