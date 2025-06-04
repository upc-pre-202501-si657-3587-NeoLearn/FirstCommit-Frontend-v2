import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuloEntity } from '../model/modulo.entity';
import { CursoEntity } from '../model/curso.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Roadmap {

  private baseUrl = 'https://my-json-server.typicode.com/VelardeSoft/database/';

  constructor(private http: HttpClient) { }

  mostrarModulos(): Observable<ModuloEntity[]> {
    return this.http.get<ModuloEntity[]>(`${this.baseUrl}/modulos`);
  }

  mostrarCursos(): Observable<CursoEntity[]> {
    return this.http.get<CursoEntity[]>(`${this.baseUrl}/cursos`);
  }
}
