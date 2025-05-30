import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainLayout} from './firstcommit/layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'firstcommit';
}
