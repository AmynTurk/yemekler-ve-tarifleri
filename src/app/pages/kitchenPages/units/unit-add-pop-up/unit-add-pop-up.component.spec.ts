import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitAddPopUpComponent } from './unit-add-pop-up.component';

describe('UnitAddPopUpComponent', () => {
  let component: UnitAddPopUpComponent;
  let fixture: ComponentFixture<UnitAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
