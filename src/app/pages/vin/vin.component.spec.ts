import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinComponent } from './vin.component';

describe('VinComponent', () => {
  let component: VinComponent;
  let fixture: ComponentFixture<VinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
