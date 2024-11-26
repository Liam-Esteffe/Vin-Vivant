import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritueuxComponent } from './spiritueux.component';

describe('SpiritueuxComponent', () => {
  let component: SpiritueuxComponent;
  let fixture: ComponentFixture<SpiritueuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpiritueuxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpiritueuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
