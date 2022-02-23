import { Component, OnInit, Output } from '@angular/core';
import {SubTaskModel, TaskModel} from '../../Models/task.model';
import {MatDialog} from '@angular/material';
import { SubTaskFormComponent } from '../sub-task-form/sub-task-form.component';
import { TaskListService } from 'src/app/Services/task-list.service';
import { ActivatedRoute } from '@angular/router';
import * as internal from 'assert';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {
  taskList: Array<SubTaskModel> = [];
  taskId: number = 0;
  taskDetail: TaskModel = new TaskModel();
  constructor(public dialog: MatDialog, private taskService: TaskListService, private route: ActivatedRoute) { }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      let taskId = params['id'];
      if(taskId) {
        this.taskId = taskId;
        this.loadSubTasks();
        this.loadTaskById(taskId)
      }     
    });
  }



  /**
   * Functionality to add/edit task
   * @ param task
   */
   addTask(task: SubTaskModel) {
     debugger;
     
    let data = {id: this.taskId, task:task}
    const dialogRef = this.dialog.open(SubTaskFormComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.loadSubTasks();
      }
    });
  }

  loadSubTasks() 
  {
    this.taskService.getTaskListByTaskId(this.taskId).subscribe(
      (response: Array<SubTaskModel>) => {
        let sortOrder = ['New', 'Completed'];
        this.taskList = response.sort((a, b) => {
          return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);
      });
      }
    );
  }

  loadTaskById(taskId) {
    this.taskService.getTaskById(taskId).subscribe(
      (response: TaskModel) => {
        this.taskDetail = response;
      }
    );
  }

  
    /**
     * Functionality to view task details
     * @ param task
     */
    viewTask(task: SubTaskModel) {
      // Code to open create 'Add Task' form
      
    }
  
    /**
     * Functionality to delete task
     * @ param task
     */
    deleteTask(taskId) {
      this.taskService.deleteSubTask(taskId).subscribe(
        (res) => {
          this.loadSubTasks();
        }
      );
    }
  
    /**
     * Functionality to mark task as Done
     * @ param task
     */
    markAsDoneTask(task: SubTaskModel) {
      let obj = {status: "Completed"}; 
      this.taskService.updatePartialSubTask(obj, task.id).subscribe(
        (res) => {
          this.loadSubTasks();
        }
      );
  
    }

}
