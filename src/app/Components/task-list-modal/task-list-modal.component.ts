import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskModel} from '../../Models/task.model';
import {MatDialog} from '@angular/material';
import {AddTaskFormComponent} from '../add-task-form/add-task-form.component';
import {TaskListService} from '../../Services/task-list.service';
import {Router} from '@angular/router';

import {ViewTaskComponent} from '../view-task/view-task.component';

@Component({
  selector: 'app-task-list-modal',
  templateUrl: './task-list-modal.component.html',
  styleUrls: ['./task-list-modal.component.css']
})
export class TaskListModalComponent implements OnInit {
  
  taskList: Array<TaskModel> = [];
  constructor( public dialog: MatDialog, private taskService: TaskListService, private router: Router) {
   }
  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTaskList().subscribe(
      (response: Array<TaskModel>) => {
        let sortOrder = ['New', 'Completed'];
        this.taskList = response.sort((a, b) => {
          return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);
      });
      }
    );
  }

  /**
   * Functionality to add/edit task
   * @ param task
   */
  addTask(task: TaskModel) {
    // Code to open create 'Add Task' form
    const dialogRef = this.dialog.open(AddTaskFormComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         this.loadTasks();
      }
    });
  }

  /**
   * Functionality to view task details
   * @ param task
   */
  viewTask(task: TaskModel) {
    // Code to open create 'Add Task' form
    const dialogRef = this.dialog.open(ViewTaskComponent, {
      width: '600px',
      data: task
    });
  }

  /**
   * Functionality to delete task
   * @ param task
   */
  deleteTask(taskId) {
    this.taskService.deleteTask(taskId).subscribe(
      (res) => {
        this.loadTasks();
      }
    );
  }

  /**
   * Functionality to mark task as Done
   * @ param task
   */
  markAsDoneTask(task: TaskModel) {
    let obj = {status: "Completed"}; 
    this.taskService.updatePartialTask(obj, task.id).subscribe(
      (res) => {
        this.loadTasks();
      }
    );

  }

  /**
   * Functionality to sign out
   */
  signOut() {
  this.router.navigate(['']);
  localStorage.removeItem('userStatus');
  }  
}
