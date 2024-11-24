import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { CarService } from '../../../services/car.service';
import { Job, JobStatus } from '../../../models/job.model';
import { Car } from '../../../models/car.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './job-list.component.html',
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  cars: Map<string, Car> = new Map<string, Car>();
  loading = false;
  JobStatus = JobStatus;

  constructor(private jobService: JobService, private carService: CarService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        const carIds = [...new Set(jobs.map((job) => job.carId))];
        carIds.forEach((carId) => {
          this.carService.getCar(carId).subscribe((car) => {
            this.cars.set(carId, car);
          });
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.loading = false;
      },
    });
  }

  getStatusClass(status: JobStatus): string {
    const baseClasses =
      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
      case JobStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case JobStatus.IN_PROGRESS:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case JobStatus.COMPLETED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case JobStatus.ON_HOLD:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  }

  getCarDetails(carId: string): string {
    const car = this.cars.get(carId);
    return car
      ? `${car.make} ${car.model} (${car.licensePlate})`
      : 'Loading...';
  }

  deleteJob(id: string): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter((job) => job.id !== id);
        },
        error: (error) => console.error('Error deleting job:', error),
      });
    }
  }
}
