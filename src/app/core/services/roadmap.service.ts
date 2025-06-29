import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roadmap } from '../models/roadmap.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {
  private apiUrl = `${environment.apiUrl}/roadmaps`;

  constructor(private http: HttpClient) { }

  getRoadmaps(): Observable<Roadmap[]> {
    return this.http.get<Roadmap[]>(this.apiUrl);
  }
}
