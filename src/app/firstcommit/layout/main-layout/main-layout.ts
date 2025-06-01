import { Component } from '@angular/core';
import {TheFooter} from "../the-footer/the-footer";
import {TheHeader} from "../the-header/the-header";
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    TheHeader,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
