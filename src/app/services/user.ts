//se conecta con la Api

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000/users';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(API);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(API, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API}/${id}`);
  }

  // ESTE ES EL IMPORTANTE (LOGIN)
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${API}/buscarPorEmail/${email}`);
  }
}
