import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {UserModel} from "../share/models/User.model";
import {Router} from "@angular/router";
import {DataExchangeService} from "../share/services/data-exchange.service";
import {forkJoin, Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private router: Router,
              private dataExchangeService: DataExchangeService) { }

  userName = '';
  noResults = '';
  isFound: boolean;
  isSearching: boolean;
  lengthPagination: number;

  pageEvent: PageEvent;

  usersArray: Array<UserModel>;
  usersInfoArray: Array<UserModel> = new Array<UserModel>();

  locationInput = '';
  languageInput = '';

  getUsersSubscriptions: Subscription = new Subscription();
  getUsersInfoSubscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.isFound = false;
    let localProps = JSON.parse(sessionStorage.getItem('searchProps'));
    if (localProps != undefined && localProps.length != 0) {
      this.userName = localProps.login;
      this.locationInput = localProps.location;
      this.languageInput = localProps.language;
    }
  }

  findUsers(page:number) {
    this.isSearching = true;
    this.noResults = '';

    sessionStorage.setItem('searchProps', JSON.stringify({login: this.userName,
      location: this.locationInput, language: this.languageInput}));

    this.usersArray = new Array<UserModel>();
    this.usersInfoArray = new Array<UserModel>();

    this.getUsersSubscriptions = this.httpService.getUsers(this.userName, this.locationInput, this.languageInput, page)
      .subscribe({
        next: (response: any) => {
          this.usersArray = response.items;
          this.lengthPagination = response.total_count;
        },
        error: error => {
          console.error('There was an error!', error);
        },
        complete: () => {
          let observeArr = [];

          this.usersArray.forEach((e) => {
            observeArr.push(this.getUserInfo(e.login))
          });

          this.getUsersInfoSubscriptions = forkJoin(observeArr).subscribe({
            next: (response: any) => {
              this.usersInfoArray = response;
            },
            error: error => {
              console.error('There was an error!', error);
            },
            complete: () => {
              if(this.usersInfoArray.length === 0) {
                this.noResults = 'Нічого не знайдено!';
              } else {
                this.isFound = true;
                this.noResults = '';
              }
              this.isSearching = false;
            }
          });
        }
      });
  }

  getUserInfo(username:string) {
    return this.httpService.getUser(username);
  }

  showUserProfile(user: string) {
    this.dataExchangeService.UserName.next(user);
    this.router.navigate(['userProfile']);
  }

  ngOnDestroy(): void {
    this.getUsersSubscriptions.unsubscribe();
    this.getUsersInfoSubscriptions.unsubscribe();
  }

}
