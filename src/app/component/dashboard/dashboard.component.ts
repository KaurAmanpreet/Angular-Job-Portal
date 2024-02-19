import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { JobService } from 'src/app/service/job.service';
import { Job } from 'src/app/model/job';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  jobs: Job[];
  constructor(private loginService: AuthService,private jobService: JobService,) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });

      //   this.loginService.getCurrentUser().then(user => {
  //     this.isAdmin = user && user.isAdmin;
  //   }).catch(error => {
  //     console.error('Authentication error:', error.message);
  //   });
  }
  deleteJob(jobId: string) {
    this.jobService.deleteJob(jobId).then(() => {
      alert('Job deleted successfully!');
    }).catch(error => {
      console.error('Delete job error:', error.message);
    });
  }
}