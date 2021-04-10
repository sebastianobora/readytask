import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthMainComponent } from './non-auth-main.component';

describe('NonAuthMainComponent', () => {
  let component: NonAuthMainComponent;
  let fixture: ComponentFixture<NonAuthMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
