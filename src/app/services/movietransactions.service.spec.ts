import { TestBed } from '@angular/core/testing';

import { MovietransactionsService } from './movietransactions.service';

describe('MovietransactionsService', () => {
  let service: MovietransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovietransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
