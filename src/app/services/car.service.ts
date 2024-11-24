import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Add this method
  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
