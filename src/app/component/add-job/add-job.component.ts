import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/job';
import { AuthService } from 'src/app/service/auth.service';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  jobForm: FormGroup;
  jobs: Job[];
  isAdmin: boolean = false;

  constructor(
    private jobService: JobService, 
    private loginService: AuthService,
    private router: Router,
    private fb: FormBuilder) {

      this.jobForm = this.fb.group({
        companyName: ['', Validators.required],
        jobType: ['', Validators.required],
        jobDescription: ['', Validators.required],
        jobLocation: ['', Validators.required],
        skills: ['', Validators.required],
        experienceLevel: ['', Validators.required],
        isActive: [true],
      });
    }

  ngOnInit() {}

  addJob() {
    if (this.jobForm.valid) {
      const newJob: Job = this.jobForm.value;
      newJob.postedAt = new Date();
      this.jobService.addJob(newJob).then(() => {
        alert('Job added successfully!');
        this.jobForm.reset();
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        console.error('Add job error:', error.message);
      });
    }else{
      alert('Invalid Inputs');
    }
  }
}
