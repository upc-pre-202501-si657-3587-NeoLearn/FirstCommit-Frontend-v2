import {Component, OnInit} from '@angular/core';
import {ModuloEntity} from '../../model/modulo.entity';
import {Roadmap} from '../../services/roadmap';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-roadmaps',
  imports: [
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './roadmaps.html',
  styleUrl: './roadmaps.css'
})
export class Roadmaps implements OnInit {

  modulos: ModuloEntity[] = [];
  selectedModuloId: number | null = null;

  constructor(private roadmapService: Roadmap) { }

  ngOnInit(): void {
    this.roadmapService.getModules().subscribe({
      next: (data) => this.modulos = data,
      error: (error) => console.error('Error al cargar módulos:', error)
    });
  }
  selectModulo(moduloId: number) {
    localStorage.setItem('selectedModuloId', moduloId.toString());
    // Redirige a la ruta de cursos
    window.location.href = '/courses';
  }
}
