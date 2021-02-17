import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInnerUpdatePopUpComponent } from './popup-inner-update-pop-up.component';

describe('PopupInnerUpdatePopUpComponent', () => {
  let component: PopupInnerUpdatePopUpComponent;
  let fixture: ComponentFixture<PopupInnerUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInnerUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInnerUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
