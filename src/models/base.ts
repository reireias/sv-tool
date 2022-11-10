export class Base {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static search(name: string) {
    return new Base(name);
  }
}
