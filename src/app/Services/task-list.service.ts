import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TaskListService {
tasksList = JSON.parse(localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')) : [];
  constructor() { }

}
