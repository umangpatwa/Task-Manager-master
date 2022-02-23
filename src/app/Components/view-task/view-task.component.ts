import {Component, Inject, Input, OnInit} from '@angular/core';
import { TaskListService } from 'src/app/Services/task-list.service';
import {TaskModel} from '../../Models/task.model';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  @Input('taskObj') taskObj: TaskModel;
  constructor(private taskService: TaskListService) {

      //this.task = data;  
  }

  ngOnInit() {
    
  }

}
