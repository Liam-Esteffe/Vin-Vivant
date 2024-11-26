import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicileComponent } from './domicile.component';

describe('DomicileComponent', () => {
  let component: DomicileComponent;
  let fixture: ComponentFixture<DomicileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomicileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
