import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appsettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { User } from '../interfaces/User';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private http = inject(HttpClient); // Corregido el nombre de la variable
  private baseUrl: string = appSettings.apiUrl;

  constructor() {}

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  registrarse(objeto: User): Observable<ResponseAcceso> {
    const headers = this.getHeaders();
    // Asegúrate de que la URL termine con /
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/register`, objeto, { headers });
  }

  login(objeto: Login): Observable<ResponseAcceso> {
    const headers = this.getHeaders();
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/login`, objeto, { headers });
  }
}
