import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserInterface } from '../shared/interfaces/user-interface';

const API_URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: null | UserInterface | undefined;

  constructor(private http: HttpClient) { }
  //TODO make logout
  register(data: {}) {
    return this.http.post<UserInterface>(`${API_URL}/register`, data).pipe(
      tap((user) => {
        this.user = user
      })
    );
  }

  login(data: {}) {
    return this.http.post<UserInterface>(`${API_URL}/login`, data).pipe(
      tap((user) => {
        this.user = user
      })
    );
  }
}
