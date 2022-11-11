import { Base } from './base.ts';
import { Statistics } from './statistics.ts';

export class Pokemon {
  base: Base;
  statistics: Statistics;

  constructor(base: Base) {
    this.base = base;
    this.statistics = new Statistics();
  }

  static search(fullId: string) {
    const [id, form] = fullId.split('-');
    const base = Base.search(Number(id), Number(form));
    return new Pokemon(base);
  }
}
