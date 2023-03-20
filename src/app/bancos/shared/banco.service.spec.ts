import { TestBed } from '@angular/core/testing';

import { BancoService } from './banco.service';

describe('GastoService', () => {
  let service: BancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
