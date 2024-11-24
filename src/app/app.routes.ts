import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CarListComponent } from './features/cars/car-list/car-list.component';
import { CarFormComponent } from './features/cars/car-form/car-form.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobFormComponent } from './features/jobs/job-form/job-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/new', component: CarFormComponent },
  { path: 'cars/edit/:id', component: CarFormComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/new', component: JobFormComponent },
  { path: 'jobs/edit/:id', component: JobFormComponent },
];
