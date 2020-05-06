import { Component, OnInit } from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {Router} from "@angular/router";
import {DataExchangeService} from "../share/services/data-exchange.service";
import {UserModel} from "../share/models/User.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router,
              private dataExchangeService: DataExchangeService) { }

  user: UserModel;
  userName: string;
  isLoad: boolean;

  ngOnInit(): void {
    this.isLoad = false;
    this.userName = this.dataExchangeService.UserName.getValue();
    this.loadUser();

  }
  loadUser() {
    this.httpService.getUser('YevhenDemchenko').subscribe({
      next: (response: any) => {
        this.user = response;
        console.log(response);
      },
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        this.isLoad = true;
      }
    });
  }

  editProfile() {

  }

}
