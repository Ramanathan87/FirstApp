import { TestBed } from '@angular/core/testing';

import { SpringSerService } from './spring-ser.service';

describe('SpringSerService', () => {
  let service: SpringSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
