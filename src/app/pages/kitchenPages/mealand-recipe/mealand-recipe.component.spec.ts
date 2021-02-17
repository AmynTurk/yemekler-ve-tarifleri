import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealandRecipeComponent } from './mealand-recipe.component';

describe('MealandRecipeComponent', () => {
  let component: MealandRecipeComponent;
  let fixture: ComponentFixture<MealandRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealandRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealandRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
