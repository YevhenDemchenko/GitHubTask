import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpService} from "../share/services/http.service";
import {Router} from "@angular/router";
import {DataExchangeService} from "../share/services/data-exchange.service";
import {UserModel} from "../share/models/User.model";
import {ReposModel} from "../share/models/Repos.model";
import {FollowerModel} from "../share/models/Follower.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router,
              private dataExchangeService: DataExchangeService) { }

  user: UserModel;
  editedUser: UserModel;
  followersArray: Array<FollowerModel> = new Array<FollowerModel>();
  reposArray: Array<ReposModel> = new Array<ReposModel>();
  userName: string;
  isLoad: boolean;
  isShowMore = false;
  isEditing: boolean;

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  ngOnInit(): void {
    this.isLoad = false;
    this.followersArray = new Array<any>();
    this.reposArray = new Array<ReposModel>();
    //this.userName = this.dataExchangeService.UserName.getValue();
    this.userName = 'YevhenDemchenko';
    if (this.userName.length === 0) {
      this.router.navigate(["users"]);
    } else {
      this.loadUser();
    }


  }
  loadTemplate() {
    if (this.isEditing) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  loadUser() {
    this.httpService.getUser(this.userName).subscribe({
      next: (response: any) => {
        this.user = response;
        console.log(response);
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
    this.httpService.getFollowers(this.user.followers_url).subscribe({
      next: (response: FollowerModel[]) => {
        response.length >=5 ? response.splice(4, response.length - 5) : response;
        for (const e of response) {
          this.followersArray.push(new FollowerModel({login: e.login, avatar_url: e.avatar_url}));
        }
        console.log(response);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  loadRepos() {
    this.httpService.getRepos(this.user.repos_url).subscribe({
      next: (response: ReposModel[]) => {
        response.length >=5 ? response.splice(4, response.length - 5) : response;
        for (const e of response) {
          this.reposArray.push(new ReposModel({name: e.name, description: e.description, language: e.language}));
        }

        console.log(response);
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
    this.editedUser = new UserModel({location: this.user.location, login: this.user.login, blog: this.user.blog,
      avatar_url: this.user.avatar_url})
    this.isEditing = !this.isEditing;
  }

  saveEditedUser() {

  }

  cancelSavingUser() {

  }

}
