import { GlobalService } from './../../shared/global.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {
  constructor(private http: HttpClient, private global: GlobalService, private storage: Storage,
    private toastController: ToastController) { }

  // sending a POST login to API
  login(data): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'login', data, options);
  }

  // sending a POST register to API
  register(data): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'register', data, options);
  }

  // sending a POST to delete account
  deleteAccount(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {
      headers: httpHeaders,
      body: data
    };
    //return this.http.delete<any>(this.global.baseUrl + 'deleteAccount?account='+ data, options);
    return this.http.delete<any>(this.global.baseUrl + 'deleteAccount', options);
  }

  // sending a POST to change password
  changePassword(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'changePassword', data, options);
  }

  // sending a POST to reset password
  requestResetPassword(data): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'requestResetPassword', data, options);
  }

  // changing global token variable to null
  async logOut() {
    this.global.token = '';
    await this.storage.remove('token');
  }

  async getToken() {
    return await this.storage.get('token');
  }
  
  async getUsername() {
    return await this.storage.get('username');
  }
  // sending a POST modify to API
  modify(token,atribute,data): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'modify/' + atribute, data, options);
  }

  getReceivedContracts(token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.get<any>(this.global.baseUrl + 'getReceivedContracts', options);
  }

  getProposedContracts(token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'getProposedContracts', options);
  }


  // sending a POST to send confirmation email
  resendEmail(data): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    const options = {headers: httpHeaders};
    
    return this.http.post<any>(this.global.baseUrl + 'sendEmail?username=' + data, options);
  }

  // sending a POST to add Favorites
  addFavorites(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.post<any>(this.global.baseUrl + 'addFavorites?userList=' + data, "", options);
  }
    
  acceptContract(data, token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.post<any>(this.global.baseUrl +'acceptContract?contract='+ data , "", options);
  }

  // sending a POST to unset Favorites
  unsetFavorites(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.post<any>(this.global.baseUrl + 'unsetFavorites?userList=' + data, "", options);
  }

  // sending GET favorites request
  getFavorites(token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'getFavorites', options);
  }
    

}
