import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGenreUpdatePopUpComponent } from './meal-genre-update-pop-up.component';

describe('MealGenreUpdatePopUpComponent', () => {
  let component: MealGenreUpdatePopUpComponent;
  let fixture: ComponentFixture<MealGenreUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealGenreUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGenreUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
