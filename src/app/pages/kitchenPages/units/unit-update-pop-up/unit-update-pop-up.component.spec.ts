import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUpdatePopUpComponent } from './unit-update-pop-up.component';

describe('UnitUpdatePopUpComponent', () => {
  let component: UnitUpdatePopUpComponent;
  let fixture: ComponentFixture<UnitUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
