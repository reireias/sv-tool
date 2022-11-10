export class Pokemon {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static search(name: string) {
    return new Pokemon(name);
  }
}
