import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {Router} from "@angular/router";
import {UserModel} from "../share/models/User.model";
import {ReposModel} from "../share/models/Repos.model";
import {FollowerModel} from "../share/models/Follower.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private router: Router) { }

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

    this.userName = !sessionStorage.getItem('showProfile') ?
      '' : JSON.parse(sessionStorage.getItem('showProfile'));

    if (this.userName.length === 0) {
      this.router.navigate(["users"]);
    } else {
      this.loadUser();
    }
  }

  loadUser() {
    this.getUserSubscriptions = this.httpService.getUser(this.userName).subscribe({
      next: (response: any) => {
        this.user = new UserModel({login: response.login, location: response.location,
          blog: response.blog, avatar_url: response.avatar_url, followers_url: response.followers_url,
          repos_url: response.repos_url, public_repos: response.public_repos, followers: response.followers,
          following: response.following, name: response.name, created_at: response.created_at});
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
          this.followersArray.push(
            new FollowerModel({login: e.login, avatar_url: e.avatar_url, html_url: e.html_url}));
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
    sessionStorage.removeItem('showProfile');
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
