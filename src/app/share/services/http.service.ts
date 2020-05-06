import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  URL_USERS = 'https://api.github.com/search/users?q=';

  subscribeUsersSearchEvent = new BehaviorSubject([]);
  subscribeUserEvent = new BehaviorSubject([]);

  getUsers() {
    return this.http.get(this.URL_USERS, this.httpOptions)
      .subscribe((list: any) => this.subscribeUsersSearchEvent.next(list.reverse()));
  }

  getUsersList(): Observable<any> {
    return this.subscribeUsersSearchEvent;
  }
}
