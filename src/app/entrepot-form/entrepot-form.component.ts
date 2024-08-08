import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';  // Include ActivatedRoute to handle edit scenario
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepotService } from '../entrepots/entrepot.service';
import { Entrepot } from '../entrepots/entrepot';

@Component({
  selector: 'app-entrepot-form',
  templateUrl: './entrepot-form.component.html',
  styleUrls: ['./entrepot-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [EntrepotService]
})
export class EntrepotFormComponent implements OnInit {
  entrepotForm: FormGroup;
  entrepotId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private entrepotService: EntrepotService,
    private router: Router,
    private route: ActivatedRoute  // To handle route parameters
  ) {
    this.entrepotForm = this.fb.group({
      id: [null],  // Add 'id' control here
      nom: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.entrepotId = +id;
        this.entrepotService.getEntrepot(this.entrepotId).subscribe(entrepot => {
          this.entrepotForm.patchValue(entrepot);
        });
      }
    });
  }

  saveEntrepot(): void {
    if (this.entrepotId !== null) {
      this.entrepotService.updateEntrepot(this.entrepotId, this.entrepotForm.value).subscribe(() => {
        this.goToEntrepotsList();
      });
    } else {
      this.entrepotService.createEntrepot(this.entrepotForm.value).subscribe(() => {
        this.goToEntrepotsList();
      });
    }
  }

  onSubmit(): void {
    if (this.entrepotForm.valid) {
      this.saveEntrepot();
    } else {
      console.error('Form is invalid');
    }
  }

  goToEntrepotsList(): void {
    this.router.navigate(['/entrepots']);
  }
}
