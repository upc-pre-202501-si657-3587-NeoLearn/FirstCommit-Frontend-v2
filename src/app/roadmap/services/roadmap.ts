import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuloEntity } from '../model/modulo.entity';
import { CursoEntity } from '../model/curso.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Roadmap {

  private baseUrl = 'https://semana13-git-main-velardesofts-projects.vercel.app';

  constructor(private http: HttpClient) { }

  getModules(): Observable<ModuloEntity[]> {
    return this.http.get<ModuloEntity[]>(`${this.baseUrl}/modulos`);
  }

  getCources(): Observable<CursoEntity[]> {
    return this.http.get<CursoEntity[]>(`${this.baseUrl}/cursos`);
  }
}
