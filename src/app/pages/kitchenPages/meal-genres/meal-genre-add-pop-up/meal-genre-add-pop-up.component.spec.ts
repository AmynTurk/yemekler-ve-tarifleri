import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGenreAddPopUpComponent } from './meal-genre-add-pop-up.component';

describe('MealGenreAddPopUpComponent', () => {
  let component: MealGenreAddPopUpComponent;
  let fixture: ComponentFixture<MealGenreAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealGenreAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGenreAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
