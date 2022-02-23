import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubTaskModel, TaskModel } from '../Models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskListService {
tasksList = JSON.parse(localStorage.getItem('taskList')) ? JSON.parse(localStorage.getItem('taskList')) : [];
  constructor(private http: HttpClient) { }

  getTaskList(){
    return this.http.get('http://127.0.0.1:8000/task/');
  }
  getTaskById(id){
    return this.http.get('http://127.0.0.1:8000/task/' + id);
  }
  addTask(taskObj: TaskModel) {
    return this.http.post('http://127.0.0.1:8000/task/', taskObj);
  }
  updateTask(taskObj: TaskModel, id) {
    return this.http.put('http://127.0.0.1:8000/task/' + id + '/', taskObj);
  }
  updatePartialTask(taskObj, id) {
    return this.http.patch('http://127.0.0.1:8000/task/' + id + '/', taskObj);
  }
  deleteTask(id) {
    return this.http.delete('http://127.0.0.1:8000/task/' + id);
  }

  getTaskListByTaskId(taskId){
    return this.http.get('http://127.0.0.1:8000/subtasks/' + taskId + '/subtasks/');
  }
  getSubTaskById(id){
    return this.http.get('http://127.0.0.1:8000/sub-task/' + id);
  }
  addSubTask(taskObj: SubTaskModel) {
    return this.http.post('http://127.0.0.1:8000/sub-task/', taskObj);
  }
  updateSubTask(taskObj: SubTaskModel, id) {
    return this.http.put('http://127.0.0.1:8000/sub-task/' + id + '/', taskObj);
  }
  updatePartialSubTask(taskObj, id) {
    return this.http.patch('http://127.0.0.1:8000/sub-task/' + id + '/', taskObj);
  }
  deleteSubTask(id) {
    return this.http.delete('http://127.0.0.1:8000/sub-task/' + id);
  }


}
