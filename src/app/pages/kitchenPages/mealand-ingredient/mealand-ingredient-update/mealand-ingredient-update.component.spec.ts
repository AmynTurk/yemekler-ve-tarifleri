import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealandIngredientUpdateComponent } from './mealand-ingredient-update.component';

describe('MealandIngredientUpdateComponent', () => {
  let component: MealandIngredientUpdateComponent;
  let fixture: ComponentFixture<MealandIngredientUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealandIngredientUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealandIngredientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
