import { GlobalService } from '../../shared/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient, private global: GlobalService) { }

proposeContract(contract, token): Observable <any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
  httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  const options = {headers: httpHeaders};
  return this.http.post<any>(this.global.baseUrl + 'proposeContract', contract, options);
}

hasContracted(contract, token): Observable <any> {
	let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'hasContracted?contract=' + contract, options);
  }

  rejectContract(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.delete<any>(this.global.baseUrl + 'rejectContract?contract='+ data, options);
  }

  saveValuation(body, token): Observable<any>{
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.post<any>(this.global.baseUrl + 'saveValuation', body, options);
  }
}