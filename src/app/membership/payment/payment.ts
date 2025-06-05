import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export default class Payment {
  @ViewChild('cardPanel') cardPanel!: MatExpansionPanel;
  @ViewChild('yapePanel') yapePanel!: MatExpansionPanel;

  selectedPaymentMethod: string | null = null;
  months = Array.from({length: 12}, (_, i) => i + 1);
  years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i);

  // Form Groups
  cardForm: FormGroup;
  yapeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Credit/Debit Card Form
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardholderName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saveCard: [false]
    });

    // Yape Form
    this.yapeForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });


  }

  private isSelecting = false;

  selectPaymentMethod(method: string) {
    if (this.isSelecting) return;
    
    this.isSelecting = true;
    this.selectedPaymentMethod = method;
    
    try {
      // Close all panels first
      if (this.cardPanel && method !== 'card') this.cardPanel.close();
      if (this.yapePanel && method !== 'yape') this.yapePanel.close();

      // Open the selected panel
      const panel = this.getPanelByMethod(method);
      if (panel) panel.open();
    } finally {
      this.isSelecting = false;
    }
  }
  
  private getPanelByMethod(method: string): MatExpansionPanel | null {
    switch(method) {
      case 'card': return this.cardPanel;
      case 'yape': return this.yapePanel;

      default: return null;
    }
  }

  onSubmit() {
    if (this.selectedPaymentMethod === 'card' && this.cardForm.valid) {
      console.log('Card payment submitted', this.cardForm.value);
      this.router.navigate(['/payment/success']);
    } else if (this.selectedPaymentMethod === 'yape' && this.yapeForm.valid) {
      console.log('Yape payment submitted', this.yapeForm.value);
      this.router.navigate(['/payment/success']);
    } else {
      // Mark all form controls as touched to show validation errors
      Object.keys(this.cardForm.controls).forEach(key => {
        this.cardForm.get(key)?.markAsTouched();
      });
      Object.keys(this.yapeForm.controls).forEach(key => {
        this.yapeForm.get(key)?.markAsTouched();
      });

    }
  }
}
