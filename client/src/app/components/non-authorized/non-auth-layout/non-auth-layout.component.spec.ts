import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NonAuthLayoutComponent} from './non-auth-layout.component';

describe('NonAuthLayoutComponent', () => {
  let component: NonAuthLayoutComponent;
  let fixture: ComponentFixture<NonAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonAuthLayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
