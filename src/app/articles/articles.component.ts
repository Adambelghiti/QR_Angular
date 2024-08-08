import { Component } from '@angular/core';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [ArticleService]
})
export class ArticlesComponent {
  articles: any[] = [];

  constructor(private articleService: ArticleService,private router: Router) {
    this.articleService.getArticles().subscribe(
      articles => {
        console.log('Articles loaded:', articles); // Add console logging to inspect the data
        this.articles = articles; // Ensure articles is an array
      },
      error => {
        console.error('Error loading articles:', error); // Log any errors
      }
    );
  }

  viewArticle(serialNumber: number): void {
    console.log('View article:', serialNumber);
  }

  editArticle(serialNumber: number): void {
    this.router.navigate(['/articles/edit', serialNumber]);
  }

  deleteArticle(serialNumber: number): void {
    this.articleService.deleteArticle(serialNumber).subscribe(() => {
      console.log(`Deleted article with serial number: ${serialNumber}`);
      this.articles = this.articles.filter(article => article.serialNumber !== serialNumber);
    });
  }

  downloadQr(serialNumber: number): void {
    console.log('Download QR code for article:', serialNumber);
  }
}
