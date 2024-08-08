import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../articles/article.service';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
})
export class ArticleFormComponent {
toggleIncludeField(arg0: string,$event: Event) {
throw new Error('Method not implemented.');
}
  articleForm: FormGroup;
entrepots: any;
fabricants: any;
fournisseurs: any;

  constructor(private fb: FormBuilder, private router: Router,     private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      nom: ['', Validators.required],
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      hauteur: ['', Validators.required],
      categorie: ['', Validators.required],
      entrepot: ['', Validators.required],
      fabricant: ['', Validators.required],
      fournisseur: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.articleService.createArticle(this.articleForm.value).subscribe(response => {
        console.log('Article created!', response);
        this.router.navigate(['/articles']);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
