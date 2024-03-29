import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserInterface } from '../shared/interfaces/user-interface';

const API_URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: null | UserInterface | undefined;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  register(data: {}) {
    return this.http.post<UserInterface>(`${API_URL}/register`, data).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', this.user.accessToken);
      })
    );
  }

  login(data: {}) {
    return this.http.post<UserInterface>(`${API_URL}/login`, data).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', this.user.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    return this.http.delete(`${API_URL}/logout`).subscribe();
  }

  getUserData(token: {}) {
    return this.http.post<UserInterface>(`${API_URL}/user`, token);
  }

  editUser(id: string | undefined, data: {}) {
    return this.http.put<UserInterface>(`${API_URL}/user/${id}`, data);
  }
}
