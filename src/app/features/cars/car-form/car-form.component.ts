import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car, CarStatus } from '../../../models/car.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './car-form.component.html',
})
export class CarFormComponent implements OnInit {
  car: Car = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    ownerName: '',
    ownerContact: '',
    dateAdded: new Date(),
    status: CarStatus.WAITING,
  };

  isEdit = false;
  loading = false;

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadCar(id);
    }
  }

  loadCar(id: string): void {
    this.loading = true;
    this.carService.getCar(id).subscribe({
      next: (car) => {
        this.car = car;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading car:', error);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    this.loading = true;
    const operation = this.isEdit
      ? this.carService.updateCar(this.car)
      : this.carService.addCar(this.car);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error saving car:', error);
        this.loading = false;
      },
    });
  }
}
