import { GlobalService } from './../../shared/global.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {
  options: any;
  httpHeaders: HttpHeaders;
  constructor(private http: HttpClient, private global: GlobalService, private storage: Storage,
    private toastController: ToastController) {
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpHeaders = this.httpHeaders.append('Access-Control-Allow-Origin', '*');
    this.options = {headers: this.httpHeaders};
  }

  // sending a POST login to API
  login(data): Observable<any> {
    return this.http.post<any>(this.global.baseUrl + 'login', data, this.options);
  }

  // sending a POST register to API
  register(data): Observable<any> {
    return this.http.post<any>(this.global.baseUrl + 'register', data, this.options);
  }

  // sending a POST to delete account
  deleteAccount(data): Observable<any> {
    const token = this.storage.get('token');
    console.log('token: ' + token);
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Bearer ' + token);
    this.options = {headers: this.httpHeaders};
    return this.http.post<any>(this.global.baseUrl, data, this.options);
  }

  // changing global token variable to null
  async logOut() {
    await this.storage.remove('token');
  }
}
