import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthContentComponent } from './non-auth-content.component';

describe('NonAuthContentComponent', () => {
  let component: NonAuthContentComponent;
  let fixture: ComponentFixture<NonAuthContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
