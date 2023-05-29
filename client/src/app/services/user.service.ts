import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any | undefined ;

  constructor(private http: HttpClient) { }

  register(data: {}) {
    return this.http.post(`${API_URL}/register`, data).pipe(
      tap((user) => {
        this.user = user
      })
    )
  }
}
