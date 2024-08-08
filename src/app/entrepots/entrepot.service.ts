// src/app/entrepots/entrepot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrepot } from './entrepot';

@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
  private apiUrl = 'http://localhost:8080/api/entrepots'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getEntrepots(): Observable<Entrepot[]> {
    return this.http.get<Entrepot[]>(this.apiUrl);
  }

  getEntrepot(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  createEntrepot(entrepot: Entrepot): Observable<Object> {
    return this.http.post<Entrepot>(`${this.apiUrl}`, entrepot);
  }

  updateEntrepot(id: number, entrepot: Entrepot): Observable<Entrepot> {
    return this.http.put<Entrepot>(`${this.apiUrl}/${id}`, entrepot);
  }

  deleteEntrepot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
