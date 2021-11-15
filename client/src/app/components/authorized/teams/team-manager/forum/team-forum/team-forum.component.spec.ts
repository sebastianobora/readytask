import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamForumComponent } from './team-forum.component';

describe('TeamForumComponent', () => {
  let component: TeamForumComponent;
  let fixture: ComponentFixture<TeamForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
