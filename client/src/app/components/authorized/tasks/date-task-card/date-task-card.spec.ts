import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateTaskCardComponent} from './date-task-card.component';

describe('DateTaskCardComponent', () => {
  let component: DateTaskCardComponent;
  let fixture: ComponentFixture<DateTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTaskCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
