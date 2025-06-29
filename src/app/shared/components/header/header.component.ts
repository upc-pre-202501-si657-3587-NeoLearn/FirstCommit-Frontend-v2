import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() state: 'public' | 'dashboard' = 'public';

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
