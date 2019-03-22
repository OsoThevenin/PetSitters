import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'https://sitterpet.herokuapp.com';
  token: string = '';
  constructor() { }
}
