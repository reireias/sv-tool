import { Base } from './base.ts';

export class Pokemon {
  name: string;
  base: Base;

  constructor(name: string, base: Base) {
    this.name = name;
    this.base = base;
  }

  static search(name: string) {
    const base = Base.search(name);
    return new Pokemon(name, base);
  }
}
