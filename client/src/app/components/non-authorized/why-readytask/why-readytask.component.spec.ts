import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyReadytaskComponent } from './why-readytask.component';

describe('WhyReadytaskComponent', () => {
  let component: WhyReadytaskComponent;
  let fixture: ComponentFixture<WhyReadytaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyReadytaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyReadytaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
