import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  @Input() tasksList = [];
  @Input('isView') isView: boolean = true;
  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() markAsDone: EventEmitter<any> = new EventEmitter();
  columns: string[] = ['taskTitle', 'taskDescription', 'actions'];
  constructor() { }

  ngOnInit() {
    
  }
}
