import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class personaService {
  private apiServerUrl='https://damianportfolio.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona>{
    return this.http.get<persona>(`${this.apiServerUrl}/persona/id/1`);
  }
  public addPersona(persona: persona):Observable<persona>{
    return this.http.put<persona>(`${this.apiServerUrl}/persona/crear`,persona)
  }
  public updatePersona(persona: persona):Observable<persona>{
    return this.http.put<persona>(`${this.apiServerUrl}/persona/editar`,persona);
  }
}
