export interface Job {
  id?: string;
  userId?: string;
  companyName: string;
  jobType: string;
  jobDescription: string;
  jobLocation: string;
  skills: string[];
  experienceLevel: string;
  postedAt: Date;
  isActive: boolean;
}
