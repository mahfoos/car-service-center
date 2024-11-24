import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJob(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  getJobsByCarId(carId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}?carId=${carId}`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${job.id}`, job);
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
