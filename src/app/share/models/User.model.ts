export class UserModel {
  constructor(props?: Partial<UserModel>) {
    if (props) {
      this.location = props.location || '';
      this.login = props.login || '';
      this.name = props.name || '';
      this.blog = props.blog || '';
      this.created_at = props.created_at || '';
      this.avatar_url = props.avatar_url || '';
      this.followers_url = props.followers_url || '';
      this.repos_url = props.repos_url || '';
      this.public_repos = props.public_repos || 0;
      this.followers = props.followers || 0;
      this.following = props.following || 0;
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
  name: string;

  default() {
    this.location = '';
    this.login = '';
    this.name = '';
    this.blog = '';
    this.created_at = '';
    this.avatar_url = '';
    this.followers_url = '';
    this.repos_url = '';
    this.public_repos = 0;
    this.followers = 0;
    this.following = 0;
  }
}
