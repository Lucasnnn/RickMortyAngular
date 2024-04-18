import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _garagem: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get garagem$() {
    return this._garagem.asObservable();
  }

  garagem(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/todosCarros`)
      .pipe(tap((response) => this._garagem.next(response)));
  }

  atualizar(id: string, dados: Object) {
    return this.http
      .put(`${environment.apiUrl}/atualizarCarro/${id}`, dados)
      .subscribe(
        (res) => {
          if (res) {
            this.garagem().pipe(first()).subscribe();
          }
        },
        (err) => {
          if (err) {
            Swal.fire({
              text: `${err.error.message}`,
              icon: 'error',
              timer: 2500,
            });
          }
        }
      );
  }

  criar(dados: Object) {
    return this.http.post(`${environment.apiUrl}/criarCarro`, dados).subscribe(
      (res) => {
        if (res) {
          this.garagem().pipe(first()).subscribe();
        }
      },
      (err) => {
        if (err) {
          Swal.fire({
            text: `${err.error.message}`,
            icon: 'error',
            timer: 2500,
          });
        }
      }
    );
  }

  deletar(id: string) {
    return this.http
      .delete(`${environment.apiUrl}/deletarCarro/${id}`)
      .subscribe((res) => {
        if (res) {
          this.garagem().pipe(first()).subscribe();
        }
      });
  }
}
