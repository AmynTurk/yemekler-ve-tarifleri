import { TestBed } from '@angular/core/testing';

import { ObjectsandObjectListsService } from './objectsand-object-lists.service';

describe('ObjectsandObjectListsService', () => {
  let service: ObjectsandObjectListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsandObjectListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
