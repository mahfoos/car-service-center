import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';
import { CarService } from './car.service';
import { JobService } from './job.service';
import { CarStatus } from '../models/car.model';
import { JobStatus } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private carService: CarService, private jobService: JobService) {}

  getDashboardStats(): Observable<DashboardStats> {
    return combineLatest([
      this.carService.getCars(),
      this.jobService.getJobs(),
    ]).pipe(
      map(([cars, jobs]) => {
        const today = new Date().toDateString();

        return {
          totalCars: cars.length,
          carsInService: cars.filter(
            (car) => car.status === CarStatus.IN_SERVICE
          ).length,
          completedJobs: jobs.filter(
            (job) => job.status === JobStatus.COMPLETED
          ).length,
          pendingJobs: jobs.filter((job) => job.status === JobStatus.PENDING)
            .length,
          inProgressJobs: jobs.filter(
            (job) => job.status === JobStatus.IN_PROGRESS
          ).length,
          onHoldJobs: jobs.filter((job) => job.status === JobStatus.ON_HOLD)
            .length,
          todayAppointments: cars.filter(
            (car) => new Date(car.dateAdded).toDateString() === today
          ).length,
          revenueToday: jobs
            .filter(
              (job) =>
                job.status === JobStatus.COMPLETED &&
                job.actualCompletionDate &&
                new Date(job.actualCompletionDate).toDateString() === today
            )
            .reduce((sum, job) => sum + job.cost, 0),
        };
      })
    );
  }
}
