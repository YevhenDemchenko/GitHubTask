import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {Router} from "@angular/router";
import {UserModel} from "../share/models/User.model";
import {ReposModel} from "../share/models/Repos.model";
import {FollowerModel} from "../share/models/Follower.model";
import {Subscription} from "rxjs";
import {DataExchangeService} from "../share/services/data-exchange.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private router: Router,
              private dataExchangeService: DataExchangeService) { }

  user: UserModel;
  editedUser: UserModel;

  followersArray: Array<FollowerModel> = new Array<FollowerModel>();
  reposArray: Array<ReposModel> = new Array<ReposModel>();

  userName: string;
  isLoad: boolean;
  isEditing: boolean;
  avatar: any;

  getUserSubscriptions: Subscription = new Subscription();
  getFollowersSubscriptions: Subscription = new Subscription();
  getReposSubscriptions: Subscription = new Subscription();

  static warningMassage(value) {
    return confirm(value);
  }

  ngOnInit(): void {
    this.isLoad = false;
    this.followersArray = new Array<any>();
    this.reposArray = new Array<ReposModel>();
    this.userName = this.dataExchangeService.UserName.getValue();
    if (this.userName.length === 0) {
      this.router.navigate(["users"]);
    } else {
      this.loadUser();
    }
  }

  loadUser() {
    this.getUserSubscriptions = this.httpService.getUser(this.userName).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: error => {
        console.error('There was an error!', error);
      },
      complete: () => {
        this.loadFollowers();
        this.loadRepos();
        this.isEditing = false;
        this.isLoad = true;
      }
    });
  }

  loadFollowers() {
    this.getFollowersSubscriptions =this.httpService.getFollowers(this.user.followers_url).subscribe({
      next: (response: FollowerModel[]) => {
        response.length >=5 ? response.splice(4, response.length - 5) : response;

        for (const e of response) {
          this.followersArray.push(new FollowerModel({login: e.login, avatar_url: e.avatar_url}));
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  loadRepos() {
    this.getReposSubscriptions = this.httpService.getRepos(this.user.repos_url).subscribe({
      next: (response: ReposModel[]) => {
        response.length >=5 ? response.splice(4, response.length - 5) : response;
        for (const e of response) {
          this.reposArray.push(new ReposModel({name: e.name, description: e.description, language: e.language,
          viewDescription: !!e.description && e.description.length > 30 ? e.description.slice(0, 27) : e.description}));
        }
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  goToSearchPage() {
    this.router.navigate(['users']);
  }

  editProfile() {
    this.editedUser = new UserModel({location: this.user.location, login: this.user.login, blog: this.user.blog})
    this.isEditing = !this.isEditing;
  }

  saveEditedUser() {
    if (this.editedUser.location != this.user.location || this.editedUser.login != this.user.login ||
      this.editedUser.blog != this.user.blog) {
      const warn = UserProfileComponent.warningMassage('Ви впевнені, що хочете зберегти зміни?');
      if(warn) {
        this.isEditing = !this.isEditing;
      }
    } else {
      this.isEditing = !this.isEditing;
    }
  }

  cancelSavingUser() {
    if (this.editedUser.location != this.user.location || this.editedUser.login != this.user.login ||
      this.editedUser.blog != this.user.blog) {
      const warn = UserProfileComponent.warningMassage('Ви впевнені, що хочете відмінити редагування?');
      if(warn) {
        this.isEditing = !this.isEditing;
      }
    } else {
      this.isEditing = !this.isEditing;
    }

  }

  ngOnDestroy(): void {
    this.getUserSubscriptions.unsubscribe();
    this.getFollowersSubscriptions.unsubscribe();
    this.getReposSubscriptions.unsubscribe();
  }

}
