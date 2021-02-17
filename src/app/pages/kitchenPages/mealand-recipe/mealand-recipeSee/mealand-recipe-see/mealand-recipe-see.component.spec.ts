import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealandRecipeSeeComponent } from './mealand-recipe-see.component';

describe('MealandRecipeSeeComponent', () => {
  let component: MealandRecipeSeeComponent;
  let fixture: ComponentFixture<MealandRecipeSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealandRecipeSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealandRecipeSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
