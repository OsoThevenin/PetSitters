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

  getActiveChats(token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'getOpenedChats', options);
  } 

  getMessagesFromChat(param,token): Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'getMessagesFromChat?userWhoReceives=' + param, options);
  }

  isContracted(contract, token): Observable <any> {
	let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};
    return this.http.get<any>(this.global.baseUrl + 'isContracted?contract=' + contract, options);
  }

  sendMessage(body, token): Observable<any>{
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {headers: httpHeaders};

    return this.http.post<any>(this.global.baseUrl + 'sendMessage', body, options);
  }
  
  deleteChat(data, token): Observable<any> {
    // Add token to headers
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    const options = {
      headers: httpHeaders,
      body: data
    };
    return this.http.delete<any>(this.global.baseUrl + 'deleteChat', options);
  }

}
