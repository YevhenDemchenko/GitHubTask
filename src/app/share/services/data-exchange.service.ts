import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  constructor() { }
  public UserName: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
