import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGenresComponent } from './meal-genres.component';

describe('MealGenresComponent', () => {
  let component: MealGenresComponent;
  let fixture: ComponentFixture<MealGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
