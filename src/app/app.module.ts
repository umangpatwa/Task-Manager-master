import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { ViewTaskComponent } from './Components/view-task/view-task.component';
import { SubTaskComponent } from './Components/sub-task/sub-task.component';
import { SubTaskFormComponent } from './Components/sub-task-form/sub-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    TaskListModalComponent,
    AddTaskFormComponent,
    TaskTableComponent,
    ViewTaskComponent,
    SubTaskComponent,
    SubTaskFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports: [MaterialModule, ReactiveFormsModule, FormsModule],
  entryComponents: [AddTaskFormComponent,SubTaskFormComponent, ViewTaskComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
