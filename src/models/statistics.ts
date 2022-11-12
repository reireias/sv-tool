import { Pdetail, statistics } from '../utils/home.ts';

export class Statistics {
  waza: { id: string; val: string }[];
  tokusei: { id: string; val: string }[];
  seikaku: { id: string; val: string }[];
  motimono: { id: string; val: string }[];

  constructor(pdetail: Pdetail) {
    this.waza = pdetail.temoti.waza;
    this.tokusei = pdetail.temoti.tokusei;
    this.seikaku = pdetail.temoti.tokusei;
    this.motimono = pdetail.temoti.motimono;
  }

  static search(id: number, form: number) {
    const st = statistics(id, form);
    return new Statistics(st);
  }
}
