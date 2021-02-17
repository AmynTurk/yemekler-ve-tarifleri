import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientGenreUpdatePopUpComponent } from './ingredient-genre-update-pop-up.component';

describe('IngredientGenreUpdatePopUpComponent', () => {
  let component: IngredientGenreUpdatePopUpComponent;
  let fixture: ComponentFixture<IngredientGenreUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientGenreUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientGenreUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
