import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRelatedWithTaskCardComponent } from './user-related-with-task-card.component';

describe('UserRelatedWithTaskCardComponent', () => {
  let component: UserRelatedWithTaskCardComponent;
  let fixture: ComponentFixture<UserRelatedWithTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRelatedWithTaskCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRelatedWithTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
