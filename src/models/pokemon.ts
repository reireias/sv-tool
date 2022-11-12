import { Base } from './base.ts';
import { Statistics } from './statistics.ts';

export class Pokemon {
  base: Base;
  statistics: Statistics;

  constructor(base: Base, statistics: Statistics) {
    this.base = base;
    this.statistics = statistics;
  }

  static search(fullId: string) {
    const [id, form] = fullId.split('-').map((s) => Number(s));
    const base = Base.search(id, form);
    const statistics = Statistics.search(id, form);
    return new Pokemon(base, statistics);
  }
}
