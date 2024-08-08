import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FabricantService } from '../fabricants/fabricant.service';
import { Fabricant } from '../fabricants/fabricant';

@Component({
  selector: 'app-fabricant-form',
  templateUrl: './fabricant-form.component.html',
  styleUrls: ['./fabricant-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [FabricantService]
})
export class FabricantFormComponent implements OnInit {
  fabricantForm: FormGroup;
  fabricantId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fabricantService: FabricantService,
    private router: Router
  ) {
    this.fabricantForm = this.fb.group({
      id: [null],  // Keeping id as null initially
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSubmit(): void {

      const fabricantData: Fabricant = this.fabricantForm.value;
      console.log('Form Submitted with Fabricant Data:', fabricantData); // Logging the object

      this.fabricantService.createFabricant(fabricantData).subscribe(
        (response) => {
          console.log('Fabricant created successfully:', response);
          this.goToFabricantList();
        },
        (error) => {
          console.error('Error occurred while creating Fabricant:', error);
        }
      )
  }

  goToFabricantList(): void {
    this.router.navigate(['/fabricants']).then((success) => {
      if (success) {
        console.log('Navigation to Fabricant list was successful');
      } else {
        console.error('Navigation to Fabricant list failed');
      }
    });
  }
}
