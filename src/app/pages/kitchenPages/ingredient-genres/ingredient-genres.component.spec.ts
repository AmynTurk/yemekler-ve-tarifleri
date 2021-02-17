import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientGenresComponent } from './ingredient-genres.component';

describe('IngredientGenresComponent', () => {
  let component: IngredientGenresComponent;
  let fixture: ComponentFixture<IngredientGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
