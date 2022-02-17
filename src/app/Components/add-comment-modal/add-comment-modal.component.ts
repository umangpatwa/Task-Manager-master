import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTable} from '@angular/material';
import {CommentsModel} from '../../Models/task.model';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.css']
})
export class AddCommentModalComponent implements OnInit {
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  taskComments = [];
  comment = '';
  editing = false;
  editCommentId;
  columns: string[] = ['description', 'createdBy', 'updatedBy', 'actions'];

  constructor(public dialogRef: MatDialogRef<AddCommentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public task: any) {
    if (task) {
      // code to get all comments
      const taskComments = JSON.parse(localStorage.getItem('taskList'))[task.id].comments ? JSON.parse(localStorage.getItem('taskList'))[task.id].comments:[];
      this.taskComments = taskComments ? taskComments : [];
      this.dialogRef.backdropClick().subscribe( () => {
        this.dialogRef.close(this.taskComments);
    }
      );
    }
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close(this.taskComments);
  }

  /**
   * Functionality to delete comment
   * @ param commentId
   */
  deleteComment(commentId: number) {
    this.taskComments.splice(commentId, 1);
    this.table.renderRows();
  }

  /**
   * Functionality to edit comment
   * @ param commentId
   */
  editComment(commentId: number) {
    this.editing = true;
    this.comment = this.taskComments[commentId].description;
    this.editCommentId = commentId;
  }

  /**
   * Functionality to add comment
   */
  addComment() {
    if (this.comment) {
      const commentObj: Partial<CommentsModel>  = {
        ...this.taskComments[this.editCommentId],
        description: this.comment,
      };
      if (!this.editing) {
        commentObj.createdBy = JSON.parse(localStorage.getItem('userStatus')).name;
        commentObj.createdOn = new Date();
        commentObj.id = this.taskComments.length;
        this.taskComments.push(commentObj);
      }
      if (this.editing) {
        commentObj.updatedBy = JSON.parse(localStorage.getItem('userStatus')).name;
        commentObj.updatedOn = new Date();
        this.taskComments[commentObj.id] = commentObj;
      }
      if (this.taskComments.length > 0 ) {
        this.table.renderRows();
      }
      this.comment = '';
      this.editing = false;
    }
  }
}
