// src/app/articles/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(serialNumber: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${serialNumber}`, article);
  }

  deleteArticle(serialNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${serialNumber}`);
  }
}
