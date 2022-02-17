import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './Material/material.module';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { TaskListModalComponent } from './Components/task-list-modal/task-list-modal.component';
import {AppRoutingModule} from './app-routing.module';
import {MatDialogModule} from '@angular/material';
import {AddTaskFormComponent} from './Components/add-task-form/add-task-form.component';
import {TaskTableComponent} from './Components/task-table/task-table.component';
import {AddCommentModalComponent} from './Components/add-comment-modal/add-comment-modal.component';
import { ViewTaskComponent } from './Components/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    TaskListModalComponent,
    AddTaskFormComponent,
    TaskTableComponent,
    AddCommentModalComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule],
  entryComponents: [AddTaskFormComponent, AddCommentModalComponent, ViewTaskComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
