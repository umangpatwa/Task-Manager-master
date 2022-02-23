import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubTaskModel} from '../../Models/task.model';
import {AuthService} from '../../Services/Auth/auth.service';
import {TaskListService} from '../../Services/task-list.service';

@Component({
  selector: 'app-sub-task-form',
  templateUrl: './sub-task-form.component.html',
  styleUrls: ['./sub-task-form.component.css']
})
export class SubTaskFormComponent implements OnInit {
  form: FormGroup;
  todayDate = new Date();
  editing = false;
public userList = [];
  constructor(private taskService: TaskListService, private authService: AuthService, private dialog: MatDialogRef<SubTaskFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
) {
    // Code to get list of all users
    this.userList = JSON.parse(localStorage.getItem('userArray')) ;
    // Code to create form group with validations
    this.form = new FormGroup({
        taskTitle: new FormControl( data && data.task.taskTitle || '', Validators.required),
        taskDescription: new FormControl(data && data.task.taskDescription  || '', Validators.required),
        
      });
}

  ngOnInit() {
    if (this.data['task']) {
      this.editing = true;
    }
  }
  handleCancel() {
    this.dialog.close();
  }
  handleSubmit() {
    const { value } = this.form;
    const taskObj: SubTaskModel = {
      ...this.data.task,
      taskTitle: value.taskTitle,
      taskDescription: value.taskDescription,
      task: this.data['id']
    };
    if (!this.editing) {
      taskObj.createdOn = new Date();
      this.taskService.addSubTask(taskObj).subscribe();
      
    }
    if (this.editing) {
      taskObj.updatedOn = new Date();
      let task_id = taskObj.id;
      delete taskObj.id;
      this.taskService.updateSubTask(taskObj, task_id).subscribe();
      
    }
    return this.dialog.close(taskObj);
  }

}
