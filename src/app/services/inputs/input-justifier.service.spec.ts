import { TestBed } from '@angular/core/testing';

import { InputJustifierService } from './input-justifier.service';

describe('InputJustifierService', () => {
  let service: InputJustifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputJustifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
