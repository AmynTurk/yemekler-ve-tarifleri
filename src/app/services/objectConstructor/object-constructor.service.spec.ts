import { TestBed } from '@angular/core/testing';

import { ObjectConstructorService } from './object-constructor.service';

describe('ObjectConstructorService', () => {
  let service: ObjectConstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectConstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
