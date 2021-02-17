import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAddPopUpComponent } from './meal-add-pop-up.component';

describe('MealAddPopUpComponent', () => {
  let component: MealAddPopUpComponent;
  let fixture: ComponentFixture<MealAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
