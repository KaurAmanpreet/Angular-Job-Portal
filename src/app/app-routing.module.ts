import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { AddJobComponent } from './component/add-job/add-job.component';
import { EditJobComponent } from './component/edit-job/edit-job.component';
import { ListJobsComponent } from './component/list-jobs/list-jobs.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo:'Home', pathMatch:'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'addJob', component: AddJobComponent, canActivate: [AuthGuardService]},
  {path: 'editJob', component:EditJobComponent, canActivate: [AuthGuardService]},
  {path: 'listJobs', component:ListJobsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
