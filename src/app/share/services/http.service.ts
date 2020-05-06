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
  URL_USER = 'https://api.github.com/users/';

  private clientId = '239cd457ca10c9a3c1e2';
  private clientSecret = '40586d719b1ae917b02df7df06ba98b3d39951ef';

  subscribeUsersSearchEvent = new BehaviorSubject([]);
  subscribeUserEvent = new BehaviorSubject([]);

  getUsers(userName: string) {
    return this.http.get(this.URL_USERS + userName+ '&client_id=' + this.clientId + '&client_secret=' + this.clientSecret, this.httpOptions);
  }

  getUser(userName: string) {
    return this.http.get(this.URL_USER + userName + '?client_id=' + this.clientId + '&client_secret=' + this.clientSecret, this.httpOptions);
  }

  getUsersList(): Observable<any> {
    return this.subscribeUsersSearchEvent;
  }
}
