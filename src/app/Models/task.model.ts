export class TaskModel {
  id: number;
  taskTitle: string;
  taskDescription: string;
  createdOn: Date;
  updatedOn: Date;
  committedOn: Date;
  status: string;

  
  constructor(){
    this.id = 0;
    this.taskTitle = '';
    this.taskDescription = '';
    this.createdOn = null;
    this.updatedOn = null;
    this.status = '';
  }

}

export class SubTaskModel {
  id: number;
  task: number;
  taskTitle: string;
  taskDescription: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;

  constructor(){
    this.id = 0;
    this.task = 0;
    this.taskTitle = '';
    this.taskDescription = '';
    this.createdOn = null;
    this.updatedOn = null;
    this.status = "New";
  }

}