import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-the-header',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule
  ],
  templateUrl: './the-header.html',
  styleUrl: './the-header.css'
})
export class TheHeader {

}
