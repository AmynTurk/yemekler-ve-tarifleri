import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientGenreAddPopUpComponent } from './ingredient-genre-add-pop-up.component';

describe('IngredientGenreAddPopUpComponent', () => {
  let component: IngredientGenreAddPopUpComponent;
  let fixture: ComponentFixture<IngredientGenreAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientGenreAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientGenreAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
