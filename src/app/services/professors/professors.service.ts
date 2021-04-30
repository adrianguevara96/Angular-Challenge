import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  constructor(
    private http: HttpClient
  ) { }

  getProfessors() {
    return this.http.get(`${environment.apiUrl}staff`);
  }
}
