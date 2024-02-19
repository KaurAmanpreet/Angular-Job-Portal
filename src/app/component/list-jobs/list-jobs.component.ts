import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {
  // jobs: Job[];
  @Input()filteredJobs: Job[] = [];  
  constructor(private jobService: JobService) { }

  ngOnInit() {
    // this.jobService.getJobs().subscribe(jobs => {
    //   this.jobs = jobs;
    // });
  }

}
