import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';   

@Component({
  selector: 'app-plans',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule    
  ],
  templateUrl: './plans.html',
  styleUrl: './plans.css'
})
export default class Plans {

}