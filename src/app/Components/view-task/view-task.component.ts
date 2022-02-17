import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../Models/task.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
task = new TaskModel();
  constructor(private dialog: MatDialogRef<ViewTaskComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
    if (data) {
      this.task = data;
    }
  }

  ngOnInit() {
  }

}
