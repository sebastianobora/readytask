import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthSectionComponent } from './non-auth-section.component';

describe('NonAuthContentComponent', () => {
  let component: NonAuthSectionComponent;
  let fixture: ComponentFixture<NonAuthSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
