import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { GlobalService } from './../../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private global: GlobalService) {}

  getUsers(): Observable<any>{
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    const options = {headers: httpHeaders};

    return this.http.get<any>(this.global.baseUrl + 'users', options);
  }
}
