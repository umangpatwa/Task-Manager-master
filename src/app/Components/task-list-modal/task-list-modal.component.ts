import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskModel} from '../../Models/task.model';
import {MatDialog} from '@angular/material';
import {AddTaskFormComponent} from '../add-task-form/add-task-form.component';
import {TaskListService} from '../../Services/task-list.service';
import {Router} from '@angular/router';
import {AddCommentModalComponent} from '../add-comment-modal/add-comment-modal.component';
import {ViewTaskComponent} from '../view-task/view-task.component';

@Component({
  selector: 'app-task-list-modal',
  templateUrl: './task-list-modal.component.html',
  styleUrls: ['./task-list-modal.component.css']
})
export class TaskListModalComponent implements OnInit {
  public allEventsList;
  public minFilterFromStartDate = new Date('2019/01/01');
  public minFilterToStartDate = new Date('2019/01/01');
  // @ts-ignore
  @ViewChild('filterFromDate') pickerFromDate;
  // @ts-ignore
  @ViewChild('filterToDate') pickerToDate;
  public maxFilterFromStartDate;
  taskList = [];
  constructor( public dialog: MatDialog, private taskService: TaskListService, private router: Router) {
    this.taskList = JSON.parse(localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')) : [];
    this.allEventsList = JSON.parse(localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')) : [];
  }
  ngOnInit() {
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
      // Code to get created tasks list and store it to taskList Array
      if (result) {
         this.taskList = JSON.parse(localStorage.getItem('taskList'));
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
  deleteTask(task: TaskModel) {
    this.taskService.tasksList.splice(task.id, 1);
    this.taskService.tasksList.forEach(
      (item, index) => {
        item.id = index;
      }
    );
    localStorage.setItem('taskList', JSON.stringify(this.taskService.tasksList));
    this.taskList = JSON.parse(localStorage.getItem('taskList'));
  }

  /**
   * Functionality to mark task as Done
   * @ param task
   */
  markAsDoneTask(task: TaskModel) {
    this.taskService.tasksList[task.id].completedOn = new Date();
    localStorage.setItem('taskList', JSON.stringify(this.taskService.tasksList));
    this.taskList = JSON.parse(localStorage.getItem('taskList'));
  }
  addComments(task) {
    // Code to open comment dialog
    const dialogRef = this.dialog.open(AddCommentModalComponent, {
      width: '800px',
      data: task
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskList[task.id].comments = result;
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
      }
    });
  }

  /**
   * Functionality to sign out
   */
  signOut() {
  this.router.navigate(['']);
  localStorage.removeItem('userStatus');
  }
  /**
   * Filter events - from selected date
   * @ param date
   */
  eventFromFilter(date: any) {
    this.minFilterToStartDate = new Date(date.value);
  }
  /**
   * Filter events - till selected date
   * @ param date
   */
  eventToFilter(date: any) {
    this.maxFilterFromStartDate = new Date(date.value);
  }
  displayFilterData() {
    this.taskList = this.allEventsList;
    // Code to check If start from date filter is applied
    if (this.pickerFromDate.nativeElement.value) {
      const filterFromDate = this.pickerFromDate.nativeElement.value;
      this.taskList = this.taskList.filter((el) => {
        const filterFromDateSeconds = new Date(filterFromDate).getTime() / 1000;
        const item = Object.assign({}, el);
        const timeInSeconds = Date.parse(item.committedOn) / 1000;
        return timeInSeconds >= filterFromDateSeconds;
      });

    }
    // Code to check If end to date filter is applied
    if (this.pickerToDate.nativeElement.value) {
      const filterToDate = this.pickerToDate.nativeElement.value;
      this.taskList = this.taskList.filter((el) => {
        const filterToDateSeconds = new Date(new Date(filterToDate).setHours(23, 59, 59, 999)).getTime() / 1000;
        const item = Object.assign({}, el);
        const timeInSeconds = Date.parse(item.committedOn) / 1000;
        return timeInSeconds <= filterToDateSeconds;
      });
    }
  }
  /**
   * Reset filter and load all events
   */
  resetFilters() {
    this.taskList = this.allEventsList;
    this.pickerFromDate.nativeElement.value = '';
    this.pickerToDate.nativeElement.value = '';
    this.maxFilterFromStartDate = new Date('01/01/5000');
    this.minFilterFromStartDate = new Date('2019/01/01');
    this.minFilterToStartDate = new Date('2019/01/01');
  }
}
