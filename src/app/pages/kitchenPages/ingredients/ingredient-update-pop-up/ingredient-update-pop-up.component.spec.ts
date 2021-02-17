import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientUpdatePopUpComponent } from './ingredient-update-pop-up.component';

describe('IngredientUpdatePopUpComponent', () => {
  let component: IngredientUpdatePopUpComponent;
  let fixture: ComponentFixture<IngredientUpdatePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientUpdatePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientUpdatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
