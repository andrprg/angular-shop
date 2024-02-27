import { Injectable } from '@angular/core';
import { AbstractStorage } from './storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends AbstractStorage {

  constructor() {
    super(localStorage);
   }
}
