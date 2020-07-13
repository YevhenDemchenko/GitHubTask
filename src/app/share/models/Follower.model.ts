export class FollowerModel {
  constructor(props?: Partial<FollowerModel>) {
    if (props) {
      this.login = props.login || '';
      this.avatar_url = props.avatar_url || '';
      this.html_url = props.html_url || '';
    } else {
      this.default();
    }
  }

  login: string;
  avatar_url: string;
  html_url: string;

  default() {
    this.login = '';
    this.avatar_url = '';
    this.html_url = '';
  }
}
