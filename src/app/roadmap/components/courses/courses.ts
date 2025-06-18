import { Component, OnInit } from '@angular/core';
import { ModuloEntity } from '../../model/modulo.entity';
import { CursoEntity } from '../../model/curso.entity';
import { Roadmap } from '../../services/roadmap';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  imports: [
    MatCardModule,
    CommonModule,
  ],
  styleUrl: './courses.css'
})
export class Courses implements OnInit {
  modulos: ModuloEntity[] = [];
  cursos: CursoEntity[] = [];
  selectedModuloId: number | null = null;

  constructor(private roadmapService: Roadmap) {}

  ngOnInit(): void {
    const id = localStorage.getItem('selectedModuloId');
    this.selectedModuloId = id ? parseInt(id, 10) : null;

    this.roadmapService.getModules().subscribe({
      next: (data) => this.modulos = data
    });
    this.roadmapService.getCources().subscribe({
      next: (data) => this.cursos = data
    });
  }

  getCursosDelModulo(): CursoEntity[] {
    if (!this.selectedModuloId) return [];
    const modulo = this.modulos.find(m => m.id === this.selectedModuloId);
    if (!modulo) return [];
    return this.cursos.filter(curso => modulo.course_ids.includes(curso.id));
  }

  // courses.component.ts
  getYoutubeThumbnail(url: string): string {
    const match = url.match(/v=([^&]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/0.jpg`
      : 'ruta.img';
  }

  abrirVideo(url: string): void {
    window.open(url, '_blank');
  }
}
