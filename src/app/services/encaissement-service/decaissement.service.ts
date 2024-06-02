import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decaissement } from '../../models/decaissment';

@Injectable({
  providedIn: 'root'
})
export class DecaissementService {

  private baseUrl = 'http://localhost:8080/api/operations-dec'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getAllDecaissement(email:string): Observable<Decaissement[]> {
    return this.http.get<Decaissement[]>(`${this.baseUrl}/getAllEmail/${email}`);
  }

  getDecaissementById(id: number): Observable<Decaissement> {
    return this.http.get<Decaissement>(`${this.baseUrl}/${id}`);
  }

  createDecaissement(decaissement: Decaissement): Observable<Decaissement> {
    return this.http.post<Decaissement>(`${this.baseUrl}/add`, decaissement);
  }

  updateDecaissement(id: number, decaissement: Decaissement): Observable<Decaissement> {
    return this.http.put<Decaissement>(`${this.baseUrl}/${id}`, decaissement);
  }

  deleteDecaissement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
