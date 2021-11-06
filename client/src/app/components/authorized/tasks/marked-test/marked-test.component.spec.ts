import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedTestComponent } from './marked-test.component';

describe('MarkedTestComponent', () => {
  let component: MarkedTestComponent;
  let fixture: ComponentFixture<MarkedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkedTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
