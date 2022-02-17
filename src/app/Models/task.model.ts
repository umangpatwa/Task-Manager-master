export class TaskModel {
  id: number;
  taskTitle: string;
  taskDescription: string;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
  assignedTo: string;
  committedOn: Date;
  completedOn: Date;
  updatedBy: string;
  comments: CommentsModel[];


  constructor() {
    this.comments = new Array<CommentsModel>();
  }

}
export class CommentsModel {
id: number;
description: string;
createdOn: Date;
createdBy: string;
updatedBy: string;
updatedOn: Date;
}
