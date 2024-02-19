import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/model/job';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  private loadJobs(): void {
    this.jobService.getJobs().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
        this.filteredJobs = jobs;
      },
      error => {
        console.error('Error loading jobs:', error);
      }
    );
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job => job.jobType.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
