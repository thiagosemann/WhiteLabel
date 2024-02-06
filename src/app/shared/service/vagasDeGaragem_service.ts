import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { VagaDeGaragem } from '../utilitarios/vagaDeGaragem';

@Injectable({
  providedIn: 'root'
})
export class VagasDeGaragemService {
  private url = 'http://localhost:80';
  private vagas: VagaDeGaragem[] = [];
  private vagaListSubject: Subject<VagaDeGaragem[]> = new Subject<VagaDeGaragem[]>();

  constructor(private http: HttpClient) {}

  getVagasDeGaragem(): Observable<VagaDeGaragem[]> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<VagaDeGaragem[]>(`${this.url}/vagasDeGaragem`, { headers });
  }

  addVagaDeGaragem(vaga: VagaDeGaragem): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(`${this.url}/vagasDeGaragem`, vaga, { headers });
  }

  updateVagaList(): void {
    this.getVagasDeGaragem().subscribe(vagas => {
      this.vagas = vagas;
      this.vagaListSubject.next(this.vagas); // Notifica os componentes sobre a atualização da lista
    });
  }

  getVagaList(): VagaDeGaragem[] {
    return this.vagas;
  }

  getVagaListObservable(): Observable<VagaDeGaragem[]> {
    return this.vagaListSubject.asObservable();
  }

  loadVagaList(): Observable<VagaDeGaragem[]> {
    this.updateVagaList();
    return this.getVagaListObservable();
  }

  getVagaDeGaragem(vagaId: number): Observable<VagaDeGaragem> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<VagaDeGaragem>(`${this.url}/vagasDeGaragem/${vagaId}`, { headers });
  }
  
  updateVagaDeGaragem(vaga: VagaDeGaragem): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const vagaId = vaga.id; // Assuming the VagaDeGaragem object has an 'id' property

    return this.http.put(`${this.url}/vagasDeGaragem/${vagaId}`, vaga, { headers });
  }

  // Implemente os métodos restantes conforme necessário
}
