import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {UserModel} from "../share/models/User.model";
import {Router} from "@angular/router";
import {DataExchangeService} from "../share/services/data-exchange.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private router: Router,
              private dataExchangeService: DataExchangeService) { }

  userName: string;
  isFound: boolean;
  usersArray: Array<UserModel>;
  usersInfoArray: Array<UserModel> = new Array<UserModel>();
  unfilteredArray: Array<UserModel> = new Array<UserModel>();

  myControlLocation = new FormControl();
  myControlLanguage = new FormControl();
  optionsLocation: any[] = [];
  optionsLanguage: any[] = [];
  filteredOptionsLocation: Observable<string[]>;
  filteredOptionsLanguage: Observable<string[]>;

  locationInput: string;

  static unique(arr) {
    return Array.from(new Set(arr));
  }


  ngOnInit(): void {
    this.isFound = false;
    if (this.dataExchangeService.UserName.getValue().length != 0) {
      this.userName = this.dataExchangeService.UserName.getValue();
      this.findUsers();
    }
  }

  findUsers() {
    this.usersArray = new Array<UserModel>();
    this.usersInfoArray = new Array<UserModel>();
    this.httpService.getUsers(this.userName).subscribe({
      next: (response: any) => {
        this.usersArray = response.items;
        console.log(response);
      },
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        for (const user of this.usersArray) {
          this.getUserInfo(user.login);
        }
        this.isFound = true;
      }
    });
  }

  getUserInfo(username:string) {
    this.httpService.getUser(username).subscribe({
      next: (response: any) => {
        console.log(response);
        this.usersInfoArray.push(response);
      },
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        let arr1: any[] = [];
        let arr2: any[] = [];

        for (const user of this.usersInfoArray) {
          if (user.location !== null) {
            arr1.push(user.location);
          }
        }

        this.optionsLocation = UsersComponent.unique(arr1);

        arr1 = null;
        arr2 = null;

        this.filteredOptionsLocation = this.myControlLocation.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterLocation(value))
          );
      }
    });
  }
  private _filterLocation(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsLocation.filter(option => option.toLowerCase().includes(filterValue));
  }

  applyFilters() {
    this.unfilteredArray.length === 0 ?
      this.unfilteredArray = this.usersInfoArray : this.usersInfoArray = this.unfilteredArray;
    this.usersInfoArray = this.usersInfoArray.filter((e) => e.location === this.locationInput);
  }

  resetFilters() {
    this.locationInput = '';
    this.usersInfoArray = this.unfilteredArray;
  }

  showUserProfile(user: string) {
    this.dataExchangeService.UserName.next(user);
    this.router.navigate(['userProfile']);
  }

  ngOnDestroy(): void {
  }

}
