import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealUpdatePopUpComponent } from './meal-update-pop-up.component';

describe('MealUpdatePopUpComponent', () => {
  let component: MealUpdatePopUpComponent;
  let fixture: ComponentFixture<MealUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
