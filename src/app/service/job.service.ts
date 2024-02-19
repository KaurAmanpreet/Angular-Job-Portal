// job.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsCollection: AngularFirestoreCollection<Job>;
  jobs: Observable<Job[]>;

  constructor(private afs: AngularFirestore) {
    this.jobsCollection = this.afs.collection('jobs');
    this.jobs = this.jobsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() })))
    );
  }

  getJobs(): Observable<Job[]> {
    return this.jobs;
  }

  addJob(job: Job): Promise<any> {
    return this.jobsCollection.add(job);
  }

  deleteJob(jobId: string): Promise<void> {
    return this.jobsCollection.doc(jobId).delete();
  }
}
