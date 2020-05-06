export class FollowerModel {
  constructor(props?: Partial<FollowerModel>) {
    if (props) {
      this.login = props.login || '';
      this.avatar_url = props.avatar_url || '';
    } else {
      props.default();
    }
  }

  login: string;
  avatar_url: string;

  default() {
    this.login = '';
    this.avatar_url = '';
  }
}
