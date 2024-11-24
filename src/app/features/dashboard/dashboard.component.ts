import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { JobService } from '../../services/job.service';
import { Car } from '../../models/car.model';
import { Job, JobStatus } from '../../models/job.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  cars: Car[] = [];
  jobs: Job[] = [];

  constructor(private carService: CarService, private jobService: JobService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.carService.getCars().subscribe((cars) => (this.cars = cars));
    this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }

  getInProgressCount(): number {
    return this.jobs.filter((job) => job.status === JobStatus.IN_PROGRESS)
      .length;
  }

  getPendingCount(): number {
    return this.jobs.filter((job) => job.status === JobStatus.PENDING).length;
  }

  getCompletedCount(): number {
    return this.jobs.filter((job) => job.status === JobStatus.COMPLETED).length;
  }

  getStatusClass(status: string): string {
    const baseClasses =
      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
    switch (status) {
      case 'WAITING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'IN_SERVICE':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'COMPLETED':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return baseClasses;
    }
  }
}
