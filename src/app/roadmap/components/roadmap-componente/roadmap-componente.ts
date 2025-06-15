import {Component, OnInit} from '@angular/core';
import { Roadmap} from '../../services/roadmap';
import { ModuloEntity } from '../../model/modulo.entity';
import { CursoEntity } from '../../model/curso.entity';
import { MatCardModule } from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-roadmap-componente',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './roadmap-componente.html',
  styleUrl: './roadmap-componente.css'
})
export class RoadmapComponente implements OnInit {

  modulos: ModuloEntity[] = [];
  cursos: CursoEntity[] = [];

  selectedModuloId: number | null = null; // módulo selec

  constructor(private roadmapService: Roadmap) { }

  ngOnInit(): void {
    this.roadmapService.mostrarModulos().subscribe({
      next: (data) => this.modulos = data,
      error: (error) => console.error('Error al cargar módulos:', error)
    });
    this.roadmapService.mostrarCursos().subscribe({
      next: (data) => this.cursos = data,
      error: (error) => console.error('Error al cargar cursos:', error)
    });
  }
  // Método para seleccionar un módulo y mostrar sus cursos
  selectModulo(moduloId: number) {
    if (this.selectedModuloId === moduloId) {
      this.selectedModuloId = null; // si clickeas el mismo módulo, deselecciona
    } else {
      this.selectedModuloId = moduloId;
    }
  }

  // Obtiene los cursos relacionados al módulo seleccionado
  getCursosDelModulo(): CursoEntity[] {
    if (!this.selectedModuloId) return [];
    const modulo = this.modulos.find(m => m.id === this.selectedModuloId);
    if (!modulo) return [];
    return this.cursos.filter(curso => modulo.course_ids.includes(curso.id));
  }
}
