import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundTeamsComponent } from './not-found-teams.component';

describe('NotFoundTeamsComponent', () => {
  let component: NotFoundTeamsComponent;
  let fixture: ComponentFixture<NotFoundTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
