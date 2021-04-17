import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthIndexComponent } from './non-auth-index.component';

describe('NonAuthMainComponent', () => {
  let component: NonAuthIndexComponent;
  let fixture: ComponentFixture<NonAuthIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
