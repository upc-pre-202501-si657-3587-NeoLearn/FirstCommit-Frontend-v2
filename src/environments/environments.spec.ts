import { TestBed } from '@angular/core/testing';

import { Environments } from './environments';

describe('Environments', () => {
  let service: Environments;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Environments);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
