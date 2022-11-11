export class Base {
  id: number;
  form: number;
  name: string;

  constructor(id: number, form: number, name: string) {
    this.id = id;
    this.form = form;
    this.name = name;
  }

  static search(id: number, form: number) {
    return new Base(id, form, '未実装');
  }
}
