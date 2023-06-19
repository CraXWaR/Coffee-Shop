import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoffeeInterface } from '../shared/interfaces/coffee-interface';

const API_URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  addCoffee(data: any) {
    return this.http.post(`${API_URL}/cafes`, { data });
  }

  getAllCafes() {
    return this.http.get<CoffeeInterface[]>(`${API_URL}/cafes`);
  }

  getOneCoffee(id: string) {
    return this.http.get<CoffeeInterface>(`${API_URL}/cafes/${id}`);
  }

  deleteCoffee(id: string | undefined, data: {}) {
    return this.http.patch(`${API_URL}/cafes/${id}`, data);
  }

  editCoffee(id: string | undefined, data: {}) {
    return this.http.put<CoffeeInterface>(`${API_URL}/cafes/${id}`, data);
  }
}
