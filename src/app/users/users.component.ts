import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {UserModel} from "../share/models/User.model";
import {Router} from "@angular/router";
import {DataExchangeService} from "../share/services/data-exchange.service";

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


  ngOnInit(): void {
    this.isFound = false;
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
      }
    });
  }

  showUserProfile(user: string) {
    this.dataExchangeService.UserName.next(user);
    this.router.navigate(['userProfile']);
  }

  ngOnDestroy(): void {
  }

}
