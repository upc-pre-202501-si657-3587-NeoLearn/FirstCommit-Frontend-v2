import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { Modulo, Curso } from '../model/roadmap.entity';

@Injectable({
  providedIn: 'root'
})
export class Roadmap {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  mostrarModulos() {
    return this.http.get<Modulo[]>(`${this.apiUrl}/modulos`);
  }

  mostrarCursos() {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`);
  }
}
