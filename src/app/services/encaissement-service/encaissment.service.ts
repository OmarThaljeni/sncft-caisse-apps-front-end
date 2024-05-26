import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../../models/bank';
import { Encaissment } from '../../models/encaissment';

@Injectable({
  providedIn: 'root'
})
export class EncaissmentService {

  private baseUrl = 'http://localhost:8080/api/operations'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getAllEncaissment(): Observable<Encaissment[]> {
    return this.http.get<Encaissment[]>(`${this.baseUrl}/`);
  }

  geEncaissmentById(id: number): Observable<Encaissment> {
    return this.http.get<Encaissment>(`${this.baseUrl}/${id}`);
  }

  createEncaissment(encaissment: Encaissment): Observable<Encaissment> {
    return this.http.post<Encaissment>(`${this.baseUrl}/add`, encaissment);
  }

  updateEncaissment(id: number, encaissment: Encaissment): Observable<Encaissment> {
    return this.http.put<Encaissment>(`${this.baseUrl}/${id}`, encaissment);
  }

  deleteBank(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
