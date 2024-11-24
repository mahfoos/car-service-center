import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './car-list.component.html',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  loading = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cars:', error);
        this.loading = false;
      },
    });
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
      case 'DELIVERED':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  }

  deleteCar(id: string): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.cars = this.cars.filter((car) => car.id !== id);
        },
        error: (error) => console.error('Error deleting car:', error),
      });
    }
  }
}
