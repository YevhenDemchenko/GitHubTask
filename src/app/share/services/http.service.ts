import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReposModel} from "../models/Repos.model";
import {FollowerModel} from "../models/Follower.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  private clientId = '239cd457ca10c9a3c1e2';
  private clientSecret = '40586d719b1ae917b02df7df06ba98b3d39951ef';
  private accessToken = 'a448a4806ec0c4864f4419e79a89107eacd5a41d';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8',
      authorization: 'token' + this.accessToken})
  };

  URL_USERS = 'https://api.github.com/search/users?q=';
  URL_USER = 'https://api.github.com/users/';

  getUsers(userName: string, location: string, language: string, page: number) {
    let locationSt = location.length!= 0 ? '+location:' : '';
    let languageSt = language.length!= 0? '+language:' : '';
    return this.http.get(`${this.URL_USERS}${userName}${locationSt}${location}${languageSt}${language}
      &client_id=${this.clientId}&client_secret=${this.clientSecret}&type=Users&page=${page}&per_page=20`, this.httpOptions);
  }

  getUser(userName: string) {
    return this.http.get(this.URL_USER + userName + '?client_id=' + this.clientId + '&client_secret=' + this.clientSecret +
      '&type=Users', this.httpOptions);
  }

  getFollowers(urlFollowers: string) {
    return this.http.get<FollowerModel[]>(urlFollowers+ '?client_id=' + this.clientId + '&client_secret=' + this.clientSecret, this.httpOptions);
  }

  getRepos(urlRepos: string) {
    return this.http.get<ReposModel[]>(urlRepos+ '?client_id=' + this.clientId + '&client_secret=' + this.clientSecret, this.httpOptions);
  }
}
