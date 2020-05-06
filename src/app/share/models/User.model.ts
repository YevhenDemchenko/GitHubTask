export class UserModel {
  constructor(props?: Partial<UserModel>) {
    if (props) {
      this.id = props.id;
      this.login = props.login || '';
      this.avatar_url = props.avatar_url || '';
      this.repos_url = props.repos_url || '';
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
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;

  default() {
    this.id = 0;
    this.login = '';
    this.avatar_url = '';
    this.repos_url = '';
  }
}
