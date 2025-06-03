import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';    
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plans',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './plans.html',
  styleUrl: './plans.css'
})
export default class Plans {

}