import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthFooterComponent } from './non-auth-footer.component';

describe('NonAuthFooterComponent', () => {
  let component: NonAuthFooterComponent;
  let fixture: ComponentFixture<NonAuthFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
