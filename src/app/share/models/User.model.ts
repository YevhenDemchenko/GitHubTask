export class UserModel {
  constructor(props?: Partial<UserModel>) {
    if (props) {
      this.location = props.location || '';
      this.login = props.login || '';
      this.blog = props.blog || '';
      this.avatar_url = props.avatar_url || '';
    } else {
      props.default();
    }
  }
  created_at: string;
  avatar_url: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  blog: string;
  followers_url: string;
  login: string;
  repos_url: string;

  default() {
    this.location = '';
    this.login = '';
    this.blog = '';
    this.avatar_url = '';
  }
}
