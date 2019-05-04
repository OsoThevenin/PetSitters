import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'http://192.168.1.43:1453/petsitters/';
  token: any = '';
  constructor() { }
}
