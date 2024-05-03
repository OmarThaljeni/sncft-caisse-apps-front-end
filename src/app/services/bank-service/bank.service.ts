import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../../models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl = 'http://localhost:8080/api/banks'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.baseUrl}/`);
  }

  getBankById(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.baseUrl}/${id}`);
  }

  createBank(bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(`${this.baseUrl}/`, bank);
  }

  updateBank(id: number, bank: Bank): Observable<Bank> {
    return this.http.put<Bank>(`${this.baseUrl}/${id}`, bank);
  }

  deleteBank(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
