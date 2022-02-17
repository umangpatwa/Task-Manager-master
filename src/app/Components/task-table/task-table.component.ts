import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  @Input() tasksList = [];
  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() addComments: EventEmitter<any> = new EventEmitter();
  @Output() markAsDone: EventEmitter<any> = new EventEmitter();
  columns: string[] = ['taskTitle', 'taskDescription', 'assignedTo', 'committedOn', 'actions'];
  constructor() { }

  ngOnInit() {
    this.tasksList.sort((a, b) => {
      if (a.committedOn > b.committedOn) { return -1; }
      if (a.committedOn < b.committedOn) { return 1; }
      return 0;
    });
  }
}
