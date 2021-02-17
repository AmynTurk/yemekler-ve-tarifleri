import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealandIngredientComponent } from './mealand-ingredient.component';

describe('MealandIngredientComponent', () => {
  let component: MealandIngredientComponent;
  let fixture: ComponentFixture<MealandIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealandIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealandIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
