import { GlobalService } from './../../shared/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  startChat(body, token): Observable <any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'startChat', body, options);
  }

}
