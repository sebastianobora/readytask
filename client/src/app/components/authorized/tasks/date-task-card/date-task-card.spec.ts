import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateTaskCard} from './date-task-card.component';

describe('DateTaskCardComponent', () => {
  let component: DateTaskCard;
  let fixture: ComponentFixture<DateTaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTaskCard]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTaskCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
