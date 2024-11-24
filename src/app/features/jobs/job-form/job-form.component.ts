import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { CarService } from '../../../services/car.service';
import { Job, JobStatus } from '../../../models/job.model';
import { Car } from '../../../models/car.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './job-form.component.html',
})
export class JobFormComponent implements OnInit {
  job: Job = {
    carId: '',
    description: '',
    status: JobStatus.PENDING,
    startDate: new Date(),
    estimatedCompletionDate: new Date(),
    cost: 0,
    mechanicName: '',
  };

  cars: Car[] = [];
  isEdit = false;
  loading = false;
  JobStatus = JobStatus;

  constructor(
    private jobService: JobService,
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCars();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadJob(id);
    }
  }

  loadCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  loadJob(id: string): void {
    this.loading = true;
    this.jobService.getJob(id).subscribe({
      next: (job) => {
        this.job = {
          ...job,
          startDate: new Date(job.startDate),
          estimatedCompletionDate: new Date(job.estimatedCompletionDate),
          actualCompletionDate: job.actualCompletionDate
            ? new Date(job.actualCompletionDate)
            : undefined,
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading job:', error);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    this.loading = true;
    const operation = this.isEdit
      ? this.jobService.updateJob(this.job)
      : this.jobService.addJob(this.job);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/jobs']);
      },
      error: (error) => {
        console.error('Error saving job:', error);
        this.loading = false;
      },
    });
  }
}
