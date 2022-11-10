export class Base {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static from(name: string) {
    return new Base(name);
  }
}
