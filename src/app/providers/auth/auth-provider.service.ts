import { GlobalService } from './../../shared/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {
  constructor(private http: HttpClient, private global: GlobalService) {}

  // sending a POST login to API
  logIn(body) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.global.baseUrl + '/login', body,
      {headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })}).toPromise()
      .then(res => {
        console.log('Correct, your logged in ', res);
        // Save token into global
      }, msg => {
        console.log('Error in promise login');
        reject(msg);
      });
    });
    return promise;
  }

  // sending a POST register to API
  signUp(body) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.global.baseUrl + '/petsitters/register', body,
        {headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })})
      .toPromise()
      .then(res => {
        console.log('Correct' + res);
      }, msg => {
        console.log('Error in promise signUp');
        reject(msg);
      });
    });
    return promise;
  }

  // changing global token variable to null
  logOut() {
    this.global.token = null;
  }
}
