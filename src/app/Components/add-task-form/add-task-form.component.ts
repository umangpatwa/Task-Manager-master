import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskModel} from '../../Models/task.model';
import {AuthService} from '../../Services/Auth/auth.service';
import {TaskListService} from '../../Services/task-list.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html', 
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {
  form: FormGroup;
  todayDate = new Date();
  editing = false;
public userList = [];
  constructor(private taskService: TaskListService, private authService: AuthService, private dialog: MatDialogRef<AddTaskFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
) {
    // Code to get list of all users
    this.userList = JSON.parse(localStorage.getItem('userArray')) ;
    // Code to create form group with validations
    this.form = new FormGroup({
        taskTitle: new FormControl( data && data.taskTitle || '', Validators.required),
        taskDescription: new FormControl(data && data.taskDescription  || '', Validators.required),
      });
}

  ngOnInit() {
    if (this.data) {
      this.editing = true;
    }
  }
  handleCancel() {
    this.dialog.close();
  }
  handleSubmit() {
    const { value } = this.form;
    const taskObj: TaskModel = {
      ...this.data,
      taskTitle: value.taskTitle,
      taskDescription: value.taskDescription,
    };
    if (!this.editing) {
      taskObj.createdOn = new Date();
      this.taskService.addTask(taskObj).subscribe();
    }
    if (this.editing) {
      taskObj.updatedOn = new Date();
      let task_id = taskObj.id;
      delete taskObj.id;
      this.taskService.updateTask(taskObj, task_id).subscribe();
    }
    return this.dialog.close(taskObj);
  }

}
