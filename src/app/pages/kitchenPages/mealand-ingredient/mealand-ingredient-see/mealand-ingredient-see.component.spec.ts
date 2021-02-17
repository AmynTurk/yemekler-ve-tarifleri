import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealandIngredientSeeComponent } from './mealand-ingredient-see.component';

describe('MealandIngredientSeeComponent', () => {
  let component: MealandIngredientSeeComponent;
  let fixture: ComponentFixture<MealandIngredientSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealandIngredientSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealandIngredientSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
