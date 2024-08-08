import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FournisseurService } from '../fournisseurs/fournisseur.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [FournisseurService]
})
export class FournisseurFormComponent implements OnInit {
  fournisseurForm: FormGroup;
  fournisseurId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fournisseurForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fournisseurId = +id;
        this.fournisseurService.getFournisseurById(this.fournisseurId).subscribe(fournisseur => {
          this.fournisseurForm.patchValue(fournisseur);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      if (this.fournisseurId !== null) {
        this.fournisseurService.updateFournisseur(this.fournisseurId, this.fournisseurForm.value).subscribe(() => {
          this.router.navigate(['/fournisseurs']);
        });
      } else {
        this.fournisseurService.createFournisseur(this.fournisseurForm.value).subscribe(() => {
          this.router.navigate(['/fournisseurs']);
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
