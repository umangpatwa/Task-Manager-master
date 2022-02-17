import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListModalComponent } from './task-list-modal.component';

describe('TaskListModalComponent', () => {
  let component: TaskListModalComponent;
  let fixture: ComponentFixture<TaskListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
