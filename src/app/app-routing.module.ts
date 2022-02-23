import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './Components/login-form/login-form.component';
import { SubTaskComponent } from './Components/sub-task/sub-task.component';
import {TaskListModalComponent} from './Components/task-list-modal/task-list-modal.component';
import {AuthGuardService as AuthGuard} from './Services/Auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'task-list',
    component: TaskListModalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task-list/:id',
    component: SubTaskComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
