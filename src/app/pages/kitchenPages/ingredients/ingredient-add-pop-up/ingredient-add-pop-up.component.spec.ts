import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAddPopUpComponent } from './ingredient-add-pop-up.component';

describe('IngredientAddPopUpComponent', () => {
  let component: IngredientAddPopUpComponent;
  let fixture: ComponentFixture<IngredientAddPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientAddPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientAddPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
