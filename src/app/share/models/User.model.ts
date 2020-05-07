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
    this.location = '';
    this.login = '';
    this.blog = '';
    this.avatar_url = '';
  }
}
