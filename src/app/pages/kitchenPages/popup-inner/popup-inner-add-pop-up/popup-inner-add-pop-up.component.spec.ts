import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInnerAddPopUpComponent } from './popup-inner-add-pop-up.component';

describe('PopupInnerAddPopUpComponent', () => {
  let component: PopupInnerAddPopUpComponent;
  let fixture: ComponentFixture<PopupInnerAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupInnerAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInnerAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
