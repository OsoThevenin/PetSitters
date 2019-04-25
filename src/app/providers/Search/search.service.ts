import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { GlobalService } from './../../shared/global.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private global: GlobalService) {}
// sending GET users request
  getUsersList(token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.get<any>(this.global.baseUrl + 'users', options);
  }
// sending GET user concret
  getUser(name, token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.get<any>(this.global.baseUrl + 'user/' + name, options);
  }

  reportUser(description, reported, token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    let body: any = {
      description: description,
      reported: reported
    };

    return this.http.post<any>(this.global.baseUrl + 'report', body, options);
  }

  filterName(body, token): Observable <any> {
	let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

	return this.http.get<any>(this.global.baseUrl + 'user/filterName', body, options);
  }
}
