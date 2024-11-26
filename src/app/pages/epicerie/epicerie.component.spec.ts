import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicerieComponent } from './epicerie.component';

describe('EpicerieComponent', () => {
  let component: EpicerieComponent;
  let fixture: ComponentFixture<EpicerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpicerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
