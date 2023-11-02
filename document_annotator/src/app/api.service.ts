import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getLabels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}labels/`);
  }

  getDocumentContent(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}documents/`);
  }

  saveAnnotation(start: number, end: number, label: string): Observable<any> {
    const data = {
      start: start,
      end: end,
      label: label,
      annotated_text: ''
    };
    return this.http.post<any>(`${this.baseUrl}annotations/`, data);
  }
}
