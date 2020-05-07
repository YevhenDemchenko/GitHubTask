export class ReposModel {
  constructor(props?: Partial<ReposModel>) {
    if (props) {
      this.name = props.name || '';
      this.language = props.language || '';
      this.description = props.description || '';
      this.viewDescription = props.viewDescription || '';
    } else {
      props.default();
    }
  }

  name: string;
  language: string;
  description: string;
  viewDescription: string;

  default() {
    this.name = '';
    this.language = '';
    this.viewDescription = '';
  }
}
