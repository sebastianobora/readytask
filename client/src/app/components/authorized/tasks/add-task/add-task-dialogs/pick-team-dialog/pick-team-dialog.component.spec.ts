import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PickTeamDialogComponent} from './pick-team-dialog.component';

describe('PickTeamDataDialogComponent', () => {
  let component: PickTeamDialogComponent;
  let fixture: ComponentFixture<PickTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickTeamDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
