import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaymycourseComponent } from './playmycourse.component';

describe('PlaymycourseComponent', () => {
  let component: PlaymycourseComponent;
  let fixture: ComponentFixture<PlaymycourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaymycourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaymycourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
