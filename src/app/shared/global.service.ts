import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'https://sitterpet.herokuapp.com/petsitters/';
  token: any = '';
  constructor() { }
}
